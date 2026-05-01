export default function ContactPage() {
  return (
    <main className="min-h-screen bg-ambient px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <section className="surface p-8 md:p-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-primary">
            Contact
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Let&apos;s grow the product conversation.
          </h1>
          <p className="mt-6 text-base leading-8 text-foreground/68">
            For product support, partnerships, or plant intelligence questions,
            reach the E4rth team through your workspace administrator. This demo
            build focuses on product depth, polish, and architecture.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {['Product demos', 'AI workflows', 'Partnerships'].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border/70 bg-background/42 p-4 text-sm font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
