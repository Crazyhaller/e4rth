'use client'

import Image from 'next/image'
import { useState } from 'react'
import { notify } from '@/lib/toast'
import { usePlants } from '@/features/plants/hooks/usePlants'
import type { Scan } from '@/types/scan'
import DiagnosisLoader from './DiagnosisLoader'
import { createScan, uploadScanImage } from '../services/scan.service'

interface Props {
  onResult: (data: Scan) => void
}

export default function UploadDropzone({ onResult }: Props) {
  const [preview, setPreview] = useState<string | null>(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const [plantId, setPlantId] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const { plants } = usePlants()

  const handleFile = async (file: File) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      setPreview(reader.result as string)
    }

    reader.readAsDataURL(file)

    setUploadingImage(true)
    setUploadedImageUrl(null)

    try {
      const uploadResult = await uploadScanImage(file)
      setUploadedImageUrl(uploadResult.secure_url)
      notify.success('Image uploaded')
    } catch (err) {
      console.error('Upload failed:', err)
      notify.error('Failed to upload image. Please try again.')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleUpload = async () => {
    if (!uploadedImageUrl) {
      notify.error('Please upload an image before scanning.')
      return
    }

    try {
      setLoading(true)

      const data = await createScan({
        imageUrl: uploadedImageUrl,
        plantId: plantId || null,
      })

      onResult(data)
      notify.success('Plant scan completed')
    } catch (err) {
      console.error('Scan failed:', err)
      notify.error('Failed to analyze plant.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="surface space-y-4 p-6">
      <div className="grid gap-3 md:grid-cols-[1fr_220px]">
        <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background/45 px-4 py-6 text-center transition hover:border-primary/50 hover:bg-primary/10">
          <span className="text-sm font-medium">Choose plant image</span>
          <span className="mt-1 text-xs text-foreground/55">
            JPG, PNG, or camera capture
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFile(file)
            }}
            className="sr-only"
          />
        </label>

        <select
          value={plantId}
          onChange={(event) => setPlantId(event.target.value)}
          className="rounded-2xl border border-border/70 bg-background/45 px-3 py-2 text-sm outline-none focus:border-primary/50"
        >
          <option value="">Link to plant</option>
          {plants.map((plant) => (
            <option key={plant.id} value={plant.id}>
              {plant.name}
            </option>
          ))}
        </select>
      </div>

      {preview && (
        <div className="relative h-60 max-h-60 w-full">
          <Image
            src={preview}
            alt="Plant preview"
            fill
            className="rounded-2xl object-cover"
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!preview || uploadingImage || loading || !uploadedImageUrl}
        className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploadingImage
          ? 'Uploading image…'
          : loading
            ? 'Analyzing...'
            : 'Analyze Plant'}
      </button>

      {loading && <DiagnosisLoader />}
    </div>
  )
}
