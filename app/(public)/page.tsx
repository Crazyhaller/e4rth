'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import {
  Activity,
  ArrowRight,
  Bell,
  Brain,
  Camera,
  ChartSpline,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import AnimatedContainer from '@/components/shared/AnimatedContainer'
import PageWrapper from '@/components/shared/PageWrapper'
import SectionWrapper from '@/components/shared/SectionWrapper'

const heroImage =
  'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=1600&q=85'
const labImage =
  'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=1400&q=85'
const careImage =
  'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1400&q=85'
const greenhouseImage =
  'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=85'

export default function HomePage() {
  return (
    <PageWrapper withAmbient>
      <section className="relative min-h-[96vh] pt-28">
        <div className="grid min-h-[calc(96vh-7rem)] items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <AnimatedContainer>
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-sm text-foreground/70 shadow-soft backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-primary" />
                AI plant intelligence for serious growers
              </div>

              <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
                E4rth turns plant care into a{' '}
                <span className="text-gradient">
                  living intelligence system.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-foreground/70 md:text-xl">
                Diagnose disease from images, generate species-aware care plans,
                track growth trends, and receive live reminders inside one
                polished botanical operating system.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/sign-up" className="btn-primary">
                  Start Your Greenhouse
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/dashboard" className="btn-secondary">
                  View Product
                </Link>
              </div>

              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="surface p-4">
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="mt-1 text-xs leading-5 text-foreground/55">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedContainer>

          <AnimatedContainer delay={0.12}>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border/70 shadow-glass">
                <Image
                  src={heroImage}
                  alt="Botanical greenhouse with lush leaves"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-soil/75 via-soil/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/20 bg-black/28 p-5 text-white backdrop-blur-xl">
                  <p className="text-sm text-white/70">Live diagnosis</p>
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold">
                        Monstera adansonii
                      </p>
                      <p className="mt-1 text-sm text-white/72">
                        Healthy growth detected. Humidity can improve by 8%.
                      </p>
                    </div>
                    <span className="rounded-full bg-leaf/90 px-3 py-1 text-sm font-semibold text-soil">
                      92%
                    </span>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -left-6 top-16 hidden w-56 rounded-3xl border border-border/70 bg-card/90 p-4 shadow-glass backdrop-blur-xl md:block"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/15 text-primary">
                    <Camera className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Scan Complete</p>
                    <p className="text-xs text-foreground/55">
                      3 steps suggested
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedContainer>
        </div>
      </section>

      <SectionWrapper
        title="A premium command center for every plant decision"
        subtitle="E4rth combines diagnostics, care orchestration, timeline tracking, reminders, and conversational AI into a single high-trust interface."
        centered
        className="pt-12"
      >
        <div id="features" className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <AnimatedContainer key={feature.title} delay={index * 0.05}>
              <div className="surface group h-full p-5 premium-ring transition hover:-translate-y-1 hover:border-primary/45">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-primary/12 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-foreground/64">
                  {feature.description}
                </p>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-10">
        <div
          id="platform"
          className="grid items-center gap-8 rounded-[2rem] border border-border/70 bg-card/60 p-5 shadow-glass backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr] lg:p-8"
        >
          <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem]">
            <Image
              src={labImage}
              alt="Careful plant inspection with botanical leaves"
              fill
              className="object-cover"
            />
          </div>

          <div className="p-2 lg:p-6">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-primary">
              Intelligent diagnosis
            </p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Upload a leaf. Receive a confident, explainable care path.
            </h2>
            <p className="mt-5 text-base leading-8 text-foreground/68">
              The diagnosis flow is designed for trust: image preview, plant
              linking, severity, confidence, treatment steps, saved history, and
              realtime completion alerts. It feels less like a form and more
              like an AI horticulture consultation.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {diagnosisPoints.map((point) => (
                <div
                  key={point}
                  className="flex gap-3 rounded-2xl border border-border/70 bg-background/45 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm leading-6 text-foreground/70">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        title="Built like a SaaS product, not a plant journal"
        subtitle="Every screen is optimized for scanning, action, and calm confidence: dense enough for power users, clear enough for beginners."
        centered
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {workflows.map((workflow) => (
            <div key={workflow.title} className="surface overflow-hidden">
              <div className="relative h-56">
                <Image
                  src={workflow.image}
                  alt={workflow.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-soil/80 to-transparent" />
                <div className="absolute bottom-4 left-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-soil">
                  {workflow.kicker}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{workflow.title}</h3>
                <p className="mt-3 text-sm leading-7 text-foreground/65">
                  {workflow.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-8">
        <div id="intelligence" className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="surface p-6 lg:p-8">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-primary">
              Realtime intelligence
            </p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              A living timeline of every scan, reminder, care plan, and growth
              signal.
            </h2>
            <p className="mt-5 text-base leading-8 text-foreground/68">
              The backend architecture already supports AI services,
              repositories, notifications, Redis optimization, and realtime
              pathways. The frontend now surfaces that complexity as a refined
              botanical control room: gentle alerts, clear charts, fast actions,
              and crisp empty states.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {systemCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-3xl border border-border/70 bg-background/45 p-5"
                >
                  <div className="mb-4 text-primary">{card.icon}</div>
                  <h3 className="font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-foreground/62">
                    {card.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface overflow-hidden">
            <div className="relative h-full min-h-[520px]">
              <Image
                src={greenhouseImage}
                alt="E4rth greenhouse leaves"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-soil/88 via-soil/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-sm text-white/72">Portfolio snapshot</p>
                <div className="mt-4 space-y-3">
                  {snapshotRows.map((row) => (
                    <div
                      key={row.label}
                      className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/76">
                          {row.label}
                        </span>
                        <span className="font-semibold">{row.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pb-28">
        <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-e4rth shadow-glass">
          <div className="grid items-center gap-8 p-8 text-primary-foreground lg:grid-cols-[1fr_0.72fr] lg:p-12">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
                Make every plant feel managed, understood, and alive.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-primary-foreground/76">
                E4rth is ready to impress: premium UI, deep architecture, AI
                diagnosis, care planning, analytics, realtime alerts, and a calm
                visual system that feels expensive without feeling loud.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-full bg-cream px-5 py-3 text-sm font-semibold text-soil transition hover:-translate-y-0.5"
              >
                Start Free
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Explore Plans
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </PageWrapper>
  )
}

const heroStats = [
  { value: '92%', label: 'AI confidence visibility' },
  { value: '24/7', label: 'Realtime plant alerts' },
  { value: '6+', label: 'Connected care systems' },
]

const features = [
  {
    title: 'AI Disease Diagnosis',
    description:
      'Image-based diagnosis with confidence, severity, treatment steps, saved scan history, and plant linking.',
    icon: <Camera className="h-5 w-5" />,
  },
  {
    title: 'Care Plan Generation',
    description:
      'Species-aware watering, sunlight, fertilizer, and notes generated through the service layer.',
    icon: <Brain className="h-5 w-5" />,
  },
  {
    title: 'Growth Analytics',
    description:
      'Health trends, portfolio KPIs, lifecycle events, and charts styled for both executive clarity and daily care.',
    icon: <ChartSpline className="h-5 w-5" />,
  },
  {
    title: 'Realtime Alerts',
    description:
      'Live notifications, scan completion events, reminders, and settings built into the dashboard shell.',
    icon: <Bell className="h-5 w-5" />,
  },
]

const diagnosisPoints = [
  'Preview image before submission',
  'Attach scans to existing plants',
  'Store history and treatment details',
  'Trigger realtime completion alerts',
]

const workflows = [
  {
    kicker: 'Care OS',
    title: 'Plant profiles with care history',
    description:
      'Each plant becomes a living record: species, tags, location, care plan, growth logs, scan results, and AI-backed insights.',
    image: careImage,
  },
  {
    kicker: 'Analytics',
    title: 'Executive-grade plant health visibility',
    description:
      'The analytics layer translates raw logs and scans into health scores, trends, alerts, and timeline signals that are easy to act on.',
    image:
      'https://images.unsplash.com/photo-1773294181678-ad51abbbc510?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    kicker: 'Assistant',
    title: 'A botanical AI companion',
    description:
      'Markdown responses, prompt chips, typing states, and persisted history make the chat feel useful instead of ornamental.',
    image:
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=85',
  },
]

const systemCards = [
  {
    title: 'Service Layer',
    copy: 'Business logic, AI orchestration, validation, and notifications remain centralized.',
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: 'Redis Optimized',
    copy: 'AI responses and realtime pathways are structured for caching and event delivery.',
    icon: <Activity className="h-5 w-5" />,
  },
  {
    title: 'User Calm',
    copy: 'Every major state has clear loading, empty, error, and success feedback.',
    icon: <Clock className="h-5 w-5" />,
  },
]

const snapshotRows = [
  { label: 'Plants tracked', value: '128' },
  { label: 'Care actions automated', value: '2.4k' },
  { label: 'AI chats resolved', value: '8.9k' },
]
