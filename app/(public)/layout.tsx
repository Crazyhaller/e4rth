import type { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

interface PublicLayoutProps {
  children: ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* 🌿 Navbar */}
      <Navbar />

      {/* 🌿 Main Content */}
      <main className="flex-1 pt-20">{children}</main>

      {/* 🌿 Footer */}
      <Footer />
    </div>
  )
}
