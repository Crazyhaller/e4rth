'use client'

import Image from 'next/image'
import { useState } from 'react'
import { notify } from '@/lib/toast'

interface Props {
  onResult: (data: any) => void
}

export default function UploadDropzone({ onResult }: Props) {
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFile = (file: File) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      setImage(reader.result as string)
    }

    reader.readAsDataURL(file)
  }

  const handleUpload = async () => {
    if (!image) return

    try {
      setLoading(true)

      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      })

      const data = await res.json()

      if (data.upgradeRequired) {
        notify.error('Daily AI limit reached. Upgrade to Premium 🌿')

        return
      }

      onResult(data)
      notify.success('Plant scan completed 🌿')
    } catch (err) {
      console.error('Scan failed:', err)
      notify.error('Failed to analyze plant.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass rounded-2xl p-6 border border-white/10 space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
        className="text-sm"
      />

      {image && (
        <div className="relative w-full max-h-60 h-60">
          <Image
            src={image}
            alt="preview"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!image || loading}
        className="px-5 py-2 rounded-xl bg-gradient-e4rth text-white text-sm shadow-glow"
      >
        {loading ? 'Analyzing...' : 'Analyze Plant'}
      </button>
    </div>
  )
}
