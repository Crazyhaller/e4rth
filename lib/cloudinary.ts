import { createHash } from 'node:crypto'

const CLOUDINARY_CLOUD_NAME =
  process.env.CLOUDINARY_CLOUD_NAME?.trim().toLowerCase()
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  throw new Error('Missing Cloudinary configuration in environment')
}

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`

export interface CloudinaryUploadResult {
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  tags: string[]
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  original_filename: string
}

export async function uploadToCloudinary(
  file: Blob,
  folder = 'e4rth/scans',
): Promise<CloudinaryUploadResult> {
  const timestamp = `${Math.floor(Date.now() / 1000)}`

  const paramsToSign = `folder=${folder}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`
  const signature = createHash('sha1').update(paramsToSign).digest('hex')

  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', folder)
  formData.append('api_key', CLOUDINARY_API_KEY!)
  formData.append('timestamp', timestamp)
  formData.append('signature', signature)

  const response = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const payload = await response.text()
    throw new Error(
      `Cloudinary upload failed: ${response.status} ${response.statusText} - ${payload}`,
    )
  }

  return response.json() as Promise<CloudinaryUploadResult>
}
