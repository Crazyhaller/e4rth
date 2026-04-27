'use client'

import PageWrapper from '@/components/shared/PageWrapper'
import SectionWrapper from '@/components/shared/SectionWrapper'
import AnimatedContainer from '@/components/shared/AnimatedContainer'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLeaf,
  faRobot,
  faChartLine,
  faBell,
  faSeedling,
  faComments,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

export default function HomePage() {
  return (
    <PageWrapper withAmbient>
      {/* 🌿 HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-ambient opacity-60 pointer-events-none" />

        <motion.div
          className="absolute w-125 h-125 rounded-full blur-3xl opacity-30 bg-gradient-verdant"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <AnimatedContainer>
            <div className="inline-block mb-6 px-4 py-1 text-sm rounded-full glass border border-white/20">
              🌿 AI-powered plant intelligence
            </div>
          </AnimatedContainer>

          <AnimatedContainer delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
              Understand Your Plants{' '}
              <span className="text-gradient">Like Never Before</span>
            </h1>
          </AnimatedContainer>

          <AnimatedContainer delay={0.2}>
            <p className="mt-6 text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Diagnose diseases, generate care plans, and track growth — all
              powered by AI. E4rth turns plant care into a precise, intelligent
              experience.
            </p>
          </AnimatedContainer>

          <AnimatedContainer delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/sign-up"
                className="px-8 py-3 rounded-2xl bg-gradient-verdant text-white font-medium shadow-glow hover:opacity-90 transition"
              >
                Start for Free
              </Link>

              <Link
                href="#features"
                className="px-8 py-3 rounded-2xl border border-white/20 text-foreground/80 hover:bg-white/10 transition"
              >
                Explore Features
              </Link>
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* 🌿 FEATURES SECTION */}
      <SectionWrapper
        title="Everything Your Plants Need"
        subtitle="From AI diagnosis to intelligent care plans and real-time insights — E4rth brings precision and simplicity together."
        centered
        className="pt-10"
      >
        <div
          id="features"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <AnimatedContainer key={feature.title} delay={index * 0.1}>
              <div className="group p-6 rounded-2xl glass border border-white/10 hover:border-primary/40 transition-all hover:shadow-glow">
                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-verdant-500/10 text-verdant-500 mb-4 text-xl">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>

                {/* Description */}
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </SectionWrapper>

      {/* 🌿 PRODUCT SHOWCASE */}
      <SectionWrapper
        title="A Beautiful, Intelligent Plant Dashboard"
        subtitle="Experience a seamless interface designed to make plant care intuitive, visual, and deeply engaging."
        centered
      >
        <div className="relative mt-10">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-ambient opacity-40 pointer-events-none" />

          <AnimatedContainer>
            <div className="relative mx-auto max-w-5xl">
              {/* Main Dashboard Card */}
              <div className="glass rounded-2xl p-6 border border-white/10 shadow-glass">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Your Plant Overview</h3>
                  <span className="text-sm text-foreground/60">
                    Last updated: Today
                  </span>
                </div>

                {/* Mock Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                      <p className="text-sm text-foreground/60">{stat.label}</p>
                      <p className="text-xl font-semibold mt-1">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Fake Chart Area */}
                <div className="mt-6 h-40 rounded-xl bg-gradient-earth flex items-center justify-center text-sm text-white/70">
                  Growth Analytics Preview
                </div>
              </div>

              {/* Floating Card */}
              <motion.div
                className="absolute -bottom-10 -right-6 w-64 glass rounded-xl p-4 border border-white/10 shadow-glass"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <p className="text-sm text-foreground/60 mb-1">AI Insight</p>
                <p className="text-sm font-medium">
                  Your Monstera needs watering tomorrow 🌱
                </p>
              </motion.div>
            </div>
          </AnimatedContainer>
        </div>
      </SectionWrapper>

      {/* Testimonials */}
      <SectionWrapper
        title="Loved by Plant Enthusiasts"
        subtitle="From beginners to experienced growers, E4rth helps people care for plants with confidence and precision."
        centered
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedContainer key={t.name} delay={i * 0.1}>
              <div className="glass rounded-2xl p-6 border border-white/10 hover:border-primary/40 transition-all hover:shadow-glow">
                {/* ⭐ Rating */}
                <div className="flex gap-1 text-verdant-400 mb-3">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <FontAwesomeIcon key={idx} icon={faStar} />
                  ))}
                </div>

                {/* 💬 Quote */}
                <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                  “{t.quote}”
                </p>

                {/* 👤 User */}
                <div className="flex items-center gap-3">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-foreground/60">{t.role}</p>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
          ))}
        </div>

        {/* 🌿 Logos / Trust Strip */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-10 opacity-70">
          {brands.map((brand) => (
            <span
              key={brand}
              className="text-sm text-foreground/60 tracking-wide"
            >
              {brand}
            </span>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper className="pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 glass p-10 md:p-16 text-center">
          {/* 🌿 Ambient Glow */}
          <div className="absolute inset-0 bg-ambient opacity-40 pointer-events-none" />

          {/* 🌫️ Floating Orb */}
          <motion.div
            className="absolute w-100 h-100 rounded-full blur-3xl opacity-30 bg-gradient-verdant"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <AnimatedContainer>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                Give Your Plants the Intelligence{' '}
                <span className="text-gradient">They Deserve</span>
              </h2>
            </AnimatedContainer>

            <AnimatedContainer delay={0.1}>
              <p className="mt-4 text-foreground/70 text-base md:text-lg">
                Join thousands of plant lovers using E4rth to diagnose, care,
                and grow with confidence.
              </p>
            </AnimatedContainer>

            <AnimatedContainer delay={0.2}>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/sign-up"
                  className="px-8 py-3 rounded-2xl bg-gradient-verdant text-white font-medium shadow-glow hover:opacity-90 transition"
                >
                  Start Free Today
                </Link>

                <Link
                  href="/pricing"
                  className="px-8 py-3 rounded-2xl border border-white/20 text-foreground/80 hover:bg-white/10 transition"
                >
                  View Pricing
                </Link>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </SectionWrapper>
    </PageWrapper>
  )
}

/* 🌿 FEATURES DATA */
const features = [
  {
    title: 'AI Disease Diagnosis',
    description:
      'Upload a plant image and instantly detect diseases with confidence scores and treatment suggestions.',
    icon: <FontAwesomeIcon icon={faLeaf} />,
  },
  {
    title: 'Smart Care Plans',
    description:
      'Get AI-generated watering, sunlight, and fertilizer schedules tailored to your plant’s needs.',
    icon: <FontAwesomeIcon icon={faRobot} />,
  },
  {
    title: 'Growth Analytics',
    description:
      'Track plant health, monitor growth patterns, and visualize trends over time.',
    icon: <FontAwesomeIcon icon={faChartLine} />,
  },
  {
    title: 'Real-Time Alerts',
    description:
      'Never miss watering or care routines with intelligent reminders and alerts.',
    icon: <FontAwesomeIcon icon={faBell} />,
  },
  {
    title: 'Plant Lifecycle Tracking',
    description:
      'Maintain a complete history of your plant’s growth, recovery, and changes.',
    icon: <FontAwesomeIcon icon={faSeedling} />,
  },
  {
    title: 'AI Plant Assistant',
    description:
      'Ask anything about your plants and get contextual, intelligent answers instantly.',
    icon: <FontAwesomeIcon icon={faComments} />,
  },
]

/* 🌱 Product MOCK DATA */
const stats = [
  { label: 'Plants', value: '12' },
  { label: 'Healthy', value: '10' },
  { label: 'Needs Care', value: '2' },
  { label: 'Alerts', value: '3' },
]

/* 🌿 TESTIMONIAL DATA */
const testimonials = [
  {
    name: 'Ananya Sharma',
    role: 'Urban Gardener',
    quote:
      'E4rth completely changed how I care for my plants. The AI diagnosis is shockingly accurate.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
  {
    name: 'Rohit Mehta',
    role: 'Plant Collector',
    quote:
      'The care plans and reminders make it effortless. I’ve never had healthier plants.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  },
  {
    name: 'Sarah Williams',
    role: 'Home Decor Enthusiast',
    quote:
      'Beautiful interface, powerful features. It feels like a premium product in every way.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
  },
]

/* 🌱 TRUST LABELS */
const brands = [
  'Trusted by 10,000+ plant lovers',
  'AI-powered insights',
  'Built for modern plant care',
]
