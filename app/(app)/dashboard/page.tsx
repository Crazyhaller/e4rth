'use client'

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

const dashboardImage =
  'https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?auto=format&fit=crop&w=1400&q=85'

export default function DashboardPage() {
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
                  key={activity.title}
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
              Your collection shows stable health, but humidity-sensitive plants
              may benefit from misting tomorrow morning. Review Monstera and
              fern care plans before the next watering cycle.
            </p>
            <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/10 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                Recommended action
              </p>
              <p className="mt-2 text-sm text-foreground/72">
                Add one growth log today to improve trend accuracy.
              </p>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  )
}

const stats = [
  {
    label: 'Total Plants',
    value: '12',
    sub: '+2 this week',
    icon: <Leaf className="h-5 w-5" />,
  },
  {
    label: 'Needs Attention',
    value: '3',
    sub: 'Watering and humidity checks',
    icon: <Bell className="h-5 w-5" />,
  },
  {
    label: 'Watered Today',
    value: '5',
    sub: 'Consistent care rhythm',
    icon: <Droplets className="h-5 w-5" />,
  },
  {
    label: 'Health Score',
    value: '87%',
    sub: 'Portfolio condition',
    icon: <Activity className="h-5 w-5" />,
  },
]

const activities = [
  {
    title: 'AI diagnosis completed',
    copy: 'Monstera scan showed no active disease and suggested a humidity adjustment.',
    time: '2 hours ago',
    icon: <Camera className="h-5 w-5" />,
  },
  {
    title: 'Watering cycle logged',
    copy: 'Snake Plant and Pothos were marked complete with stable health signals.',
    time: '5 hours ago',
    icon: <Droplets className="h-5 w-5" />,
  },
  {
    title: 'Care plan refinement',
    copy: 'AI recommended lighter fertilizer frequency for indoor tropical plants.',
    time: 'Yesterday',
    icon: <Sparkles className="h-5 w-5" />,
  },
]
