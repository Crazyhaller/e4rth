import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import ToastProvider from '@/components/providers/ToastProvider'
import ThemeProvider from '@/components/providers/ThemeProvider'

export const metadata: Metadata = {
  title: 'E4rth',
  description: 'Premium AI-powered plant intelligence platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-full flex flex-col">
          <ThemeProvider>
            {children}
            <ToastProvider />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
