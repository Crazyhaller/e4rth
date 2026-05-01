'use client'

import { Activity, Bell, Camera, Leaf } from 'lucide-react'
import ErrorState from '@/components/feedback/ErrorState'
import Loader from '@/components/feedback/Loader'
import { useGlobalAnalytics } from '@/features/analytics/hooks/useGlobalAnalytics'
import GrowthChart from './GrowthChart'
import HealthScoreChart from './HealthScoreChart'
import StatsCard from './StatsCard'
import TimelineGraph from './TimelineGraph'

export default function AnalyticsDashboard() {
  const { analytics, error, loading, refresh } = useGlobalAnalytics()

  if (loading) {
    return <Loader label="Loading analytics" />
  }

  if (error || !analytics) {
    return (
      <ErrorState
        message={error ?? 'Analytics could not be loaded'}
        onRetry={refresh}
      />
    )
  }

  const health = Math.round(analytics.averageHealthScore || 0)

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          icon={<Leaf className="h-5 w-5" />}
          label="Plants"
          value={analytics.totalPlants}
          sub="Tracked in your collection"
        />
        <StatsCard
          icon={<Camera className="h-5 w-5" />}
          label="Scans"
          value={analytics.totalScans}
          sub="AI diagnosis history"
        />
        <StatsCard
          icon={<Bell className="h-5 w-5" />}
          label="Unread Alerts"
          value={analytics.unreadNotifications}
          sub={`${analytics.totalNotifications} total notifications`}
        />
        <StatsCard
          icon={<Activity className="h-5 w-5" />}
          label="Healthy Signals"
          value={analytics.healthyPlants}
          sub="Low severity scan results"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <HealthScoreChart score={health} />
        <GrowthChart
          labels={['Week 1', 'Week 2', 'Week 3', 'Week 4']}
          health={[
            Math.max(health - 9, 0),
            Math.max(health - 4, 0),
            Math.min(health + 2, 100),
            health,
          ]}
        />
      </div>

      <TimelineGraph
        items={[
          {
            label: 'Care consistency',
            value: `${analytics.totalPlants} plants available for routine analysis.`,
          },
          {
            label: 'Diagnosis coverage',
            value: `${analytics.totalScans} scans processed by E4rth.`,
          },
          {
            label: 'Attention queue',
            value: `${analytics.unreadNotifications} alert(s) awaiting review.`,
          },
        ]}
      />
    </div>
  )
}
