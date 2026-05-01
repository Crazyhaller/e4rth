'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function BeforeAfterSlider({
  before,
  after,
}: {
  before: string
  after: string
}) {
  const [value, setValue] = useState(50)

  return (
    <div className="space-y-3">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
        <Image src={before} alt="Before" fill className="object-cover" />
        <div
          className="absolute inset-y-0 right-0 overflow-hidden"
          style={{ width: `${100 - value}%` }}
        >
          <Image src={after} alt="After" fill className="object-cover" />
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        className="w-full accent-e4rth-500"
        aria-label="Compare before and after"
      />
    </div>
  )
}
