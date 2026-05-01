'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Activity,
  Bell,
  CalendarDays,
  Camera,
  Droplets,
  Leaf,
  Sparkles,
} from 'lucide-react'
import AnimatedContainer from '@/components/shared/AnimatedContainer'
import { useGlobalAnalytics } from '@/features/analytics/hooks/useGlobalAnalytics'
import { useNotifications } from '@/features/notifications/hooks/useNotifications'
import { useScanHistory } from '@/features/scan/hooks/useScanHistory'
import type { NotificationItem } from '@/types/notification'
import type { Scan } from '@/types/scan'

const dashboardImage =
  'https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?auto=format&fit=crop&w=1400&q=85'

function formatRelativeTime(date?: string | Date | null) {
  if (!date) return 'Unknown time'
  const timestamp = new Date(date).getTime()
  const diff = Date.now() - timestamp

  if (diff < 60_000) return 'Just now'
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} min ago`
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)} hr ago`

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
  }).format(timestamp)
}

function getNotificationLabel(type: NotificationItem['type']) {
  switch (type) {
    case 'scan_completed':
      return 'Scan completed'
    case 'care_reminder':
      return 'Care reminder'
    case 'plant_alert':
      return 'Plant alert'
    case 'growth_insight':
      return 'Growth insight'
    default:
      return 'Activity'
  }
}

function getNotificationIcon(type: NotificationItem['type']) {
  switch (type) {
    case 'scan_completed':
      return <Camera className="h-5 w-5" />
    case 'care_reminder':
      return <Droplets className="h-5 w-5" />
    case 'plant_alert':
      return <Bell className="h-5 w-5" />
    case 'growth_insight':
      return <Sparkles className="h-5 w-5" />
    default:
      return <Sparkles className="h-5 w-5" />
  }
}

export default function DashboardPage() {
  const { analytics, loading: analyticsLoading } = useGlobalAnalytics()
  const { notifications, loading: notificationsLoading } = useNotifications()
  const { history: scanHistory, loading: scanHistoryLoading } = useScanHistory()

  const stats = useMemo(
    () => [
      {
        label: 'Total plants',
        value: analytics?.totalPlants ?? '–',
        sub: 'Plants in your collection',
        icon: <Leaf className="h-5 w-5" />,
      },
      {
        label: 'Completed scans',
        value: analytics?.totalScans ?? '–',
        sub: 'Diagnoses processed for your plants',
        icon: <Camera className="h-5 w-5" />,
      },
      {
        label: 'Unread alerts',
        value: analytics?.unreadNotifications ?? '–',
        sub: 'Pending notifications to review',
        icon: <Bell className="h-5 w-5" />,
      },
      {
        label: 'Average health',
        value:
          analytics?.averageHealthScore != null
            ? `${Math.round(analytics.averageHealthScore)}%`
            : '–',
        sub: 'Calculated from recent growth logs',
        icon: <Activity className="h-5 w-5" />,
      },
    ],
    [analytics],
  )

  const activities = useMemo(() => {
    if (notifications.length > 0) {
      return notifications.slice(0, 3).map((notification) => ({
        title: getNotificationLabel(notification.type),
        copy: notification.message,
        time: formatRelativeTime(notification.createdAt),
        icon: getNotificationIcon(notification.type),
      }))
    }

    if (scanHistory.length > 0) {
      return scanHistory.slice(0, 3).map((scan: Scan) => ({
        title:
          scan.disease === 'healthy'
            ? 'Scan completed'
            : `Scan detected ${scan.disease}`,
        copy: `Severity ${scan.severity} · Confidence ${Math.round(
          scan.confidence * 100,
        )}%`,
        time: formatRelativeTime(scan.createdAt),
        icon: <Camera className="h-5 w-5" />,
      }))
    }

    return [
      {
        title: 'No recent activity yet',
        copy: 'Run a scan or add a growth log to populate your dashboard.',
        time: 'Start now',
        icon: <Sparkles className="h-5 w-5" />,
      },
    ]
  }, [notifications, scanHistory])

  const aiInsight = useMemo(() => {
    if (analyticsLoading || notificationsLoading || scanHistoryLoading) {
      return {
        message: 'Loading your dashboard insights…',
        action: 'Refresh the page if this takes too long.',
      }
    }

    if (!analytics) {
      return {
        message:
          'No analytics yet. Add a plant or run a scan to generate insights.',
        action: 'Start with your first diagnosis.',
      }
    }

    if (analytics.unreadNotifications > 0) {
      return {
        message: `You have ${analytics.unreadNotifications} unread alert${
          analytics.unreadNotifications === 1 ? '' : 's'
        }. Review them to keep your plants healthy.`,
        action: 'Open notifications to resolve issues.',
      }
    }

    if (analytics.averageHealthScore >= 85) {
      return {
        message:
          'Your plant collection looks healthy. Keep tracking scans and logs to stay ahead.',
        action: 'Add a growth log to keep the trend current.',
      }
    }

    if (analytics.averageHealthScore < 70) {
      return {
        message:
          'Some plants may need extra attention. Review recent scans and care reminders.',
        action: 'Check your latest notifications and plant details.',
      }
    }

    return {
      message:
        'Your plants are stable. A fresh scan or growth log will make your care plan smarter.',
      action: 'Run a diagnosis or log plant growth today.',
    }
  }, [analytics, analyticsLoading, notificationsLoading, scanHistoryLoading])

  return (
    <div className="space-y-8">
      <AnimatedContainer>
        <section className="surface overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[1fr_430px]">
            <div className="p-6 md:p-8">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/50 px-3 py-1.5 text-xs font-medium text-foreground/62">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Today&apos;s greenhouse intelligence
              </div>
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
                Your plants are organized, monitored, and quietly protected.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-foreground/66 md:text-base">
                E4rth consolidates scan results, growth logs, reminders, and AI
                recommendations into a calm command center designed for daily
                care and long-term plant health.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/scan" className="btn-primary">
                  Run Diagnosis
                </Link>
                <Link href="/plants" className="btn-secondary">
                  Manage Plants
                </Link>
              </div>
            </div>
            <div className="relative min-h-72 overflow-hidden lg:min-h-full">
              <Image
                src={dashboardImage}
                alt="Warm botanical workspace"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-soil/75 via-soil/10 to-transparent" />
            </div>
          </div>
        </section>
      </AnimatedContainer>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <AnimatedContainer key={stat.label} delay={index * 0.05}>
            <div className="surface p-5 transition hover:-translate-y-1 hover:border-primary/35">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/60">{stat.label}</span>
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/12 text-primary">
                  {stat.icon}
                </span>
              </div>
              <p className="mt-4 text-3xl font-semibold">{stat.value}</p>
              <p className="mt-1 text-xs leading-5 text-foreground/55">
                {stat.sub}
              </p>
            </div>
          </AnimatedContainer>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_380px]">
        <AnimatedContainer>
          <div className="surface h-full p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Care Timeline</h3>
                <p className="mt-1 text-sm text-foreground/55">
                  Recent activity and upcoming actions
                </p>
              </div>
              <CalendarDays className="h-5 w-5 text-primary" />
            </div>

            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity.title + activity.time}
                  className="flex items-start gap-4 rounded-2xl border border-border/70 bg-background/42 p-4"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary/12 text-primary">
                    {activity.icon}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="mt-1 text-sm leading-6 text-foreground/60">
                      {activity.copy}
                    </p>
                    <p className="mt-2 text-xs text-foreground/42">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.1}>
          <div className="surface h-full p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-e4rth text-primary-foreground">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">AI Insight</h3>
                <p className="text-xs text-foreground/50">Updated just now</p>
              </div>
            </div>
            <p className="text-sm leading-7 text-foreground/68">
              {aiInsight.message}
            </p>
            <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/10 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                Recommended action
              </p>
              <p className="mt-2 text-sm text-foreground/72">
                {aiInsight.action}
              </p>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  )
}
