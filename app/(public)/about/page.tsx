import Image from 'next/image'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-ambient px-6 py-28">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_420px]">
        <section className="surface p-8 md:p-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-primary">
            About E4rth
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            A calmer, smarter operating system for plant care.
          </h1>
          <p className="mt-6 text-base leading-8 text-foreground/68">
            E4rth brings diagnosis, care planning, plant records, analytics,
            reminders, and AI conversation into a premium product experience. It
            is built for people who want software that feels as thoughtful as
            the living collections they maintain.
          </p>
          <p className="mt-4 text-base leading-8 text-foreground/68">
            The interface is intentionally warm, earthy, and structured: deep
            olive for intelligence, brown for grounded trust, and botanical
            imagery for context without clutter.
          </p>
        </section>

        <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-border/70 shadow-glass">
          <Image
            src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=85"
            alt="Lush potted plants"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-soil/75 to-transparent" />
        </div>
      </div>
    </main>
  )
}
