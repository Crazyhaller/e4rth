import { apiRequest } from '@/lib/api/client'
import type { Scan } from '@/types/scan'

export interface CreateScanPayload {
  imageUrl: string
  plantId?: string | null
}

export interface CloudinaryUploadResult {
  asset_id: string
  public_id: string
  secure_url: string
  original_filename: string
  format: string
  width: number
  height: number
  resource_type: string
  bytes: number
}

export async function uploadScanImage(file: File) {
  const body = new FormData()

  body.append('file', file)

  return apiRequest<CloudinaryUploadResult>('/api/cloudinary/upload', {
    method: 'POST',
    body,
  })
}

export async function createScan(payload: CreateScanPayload) {
  return apiRequest<Scan>('/api/scan', {
    method: 'POST',
    body: payload,
  })
}

export async function getScanHistory() {
  return apiRequest<Scan[]>('/api/scan/history')
}

export async function getScan(scanId: string) {
  return apiRequest<Scan>(`/api/scan/${scanId}`)
}
