import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'For personal collections and early plant-care workflows.',
    features: ['5 daily scans', '20 AI chat messages', 'Plant tracking'],
  },
  {
    name: 'Premium',
    price: 'Coming soon',
    description: 'Prepared for teams, serious collectors, and advanced care.',
    features: ['Higher AI limits', 'Advanced analytics', 'Realtime care alerts'],
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-ambient px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="surface p-8 text-center md:p-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-primary">
            Pricing
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Premium plant intelligence, payment-free for this release.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-foreground/66 md:text-base">
            Checkout is intentionally postponed. The product experience is
            focused on AI diagnosis, plant management, analytics, realtime
            alerts, and a refined SaaS workflow.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div key={plan.name} className="surface p-6">
              <h2 className="text-xl font-semibold">{plan.name}</h2>
              <p className="mt-3 text-4xl font-semibold">{plan.price}</p>
              <p className="mt-3 text-sm leading-7 text-foreground/62">
                {plan.description}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-foreground/70">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Link href="/dashboard" className="btn-primary mt-8">
          Open Dashboard
        </Link>
      </div>
    </main>
  )
}
