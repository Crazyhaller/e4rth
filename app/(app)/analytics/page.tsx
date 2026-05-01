import AnalyticsDashboard from '@/features/care/components/AnalyticsDashboard'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="surface p-6 md:p-8">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-primary">
          Growth intelligence
        </p>
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
          Analytics that make plant health legible.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/64">
          Portfolio health, scan trends, timeline signals, and KPIs styled for
          fast understanding in both light and dark mode.
        </p>
      </div>

      <AnalyticsDashboard />
    </div>
  )
}
