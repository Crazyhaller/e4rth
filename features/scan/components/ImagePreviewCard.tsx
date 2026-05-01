import Image from 'next/image'

export default function ImagePreviewCard({
  imageUrl,
  alt = 'Plant scan preview',
}: {
  imageUrl: string
  alt?: string
}) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/70 bg-background/45">
      <Image src={imageUrl} alt={alt} fill className="object-cover" />
    </div>
  )
}
