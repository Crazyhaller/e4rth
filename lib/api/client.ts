export class ApiError extends Error {
  status: number
  payload: unknown

  constructor(message: string, status: number, payload: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.payload = payload
  }
}

type JsonBody = object

interface ApiRequestInit extends Omit<RequestInit, 'body'> {
  body?: BodyInit | JsonBody | null
}

function isJsonBody(body: ApiRequestInit['body']): body is JsonBody {
  return Boolean(
    body &&
      typeof body === 'object' &&
      !(body instanceof FormData) &&
      !(body instanceof Blob) &&
      !(body instanceof ArrayBuffer) &&
      !(body instanceof URLSearchParams),
  )
}

export async function apiRequest<T>(
  input: string,
  init: ApiRequestInit = {},
): Promise<T> {
  const { body, ...rest } = init
  const headers = new Headers(init.headers)
  const requestInit: RequestInit = {
    ...rest,
    headers,
  }

  if (isJsonBody(body)) {
    headers.set('Content-Type', 'application/json')
    requestInit.body = JSON.stringify(body)
  } else if (body) {
    requestInit.body = body
  }

  const response = await fetch(input, requestInit)
  const contentType = response.headers.get('content-type') ?? ''
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    const message =
      typeof payload === 'object' &&
      payload !== null &&
      'error' in payload &&
      typeof payload.error === 'string'
        ? payload.error
        : `Request failed with status ${response.status}`

    throw new ApiError(message, response.status, payload)
  }

  return payload as T
}
