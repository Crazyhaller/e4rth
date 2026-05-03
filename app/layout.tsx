import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import ToastProvider from '@/components/providers/ToastProvider'
import ThemeProvider from '@/components/providers/ThemeProvider'

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://my-e4rth.vercel.app'

const siteName = 'E4rth'

const title = 'E4rth — Premium AI Plant Intelligence Platform'

const description =
  'E4rth helps you diagnose plant diseases, generate AI-powered care plans, track plant growth, monitor health analytics, and manage your botanical ecosystem with an immersive premium experience.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: title,
    template: `%s | ${siteName}`,
  },

  description,

  applicationName: siteName,

  keywords: [
    'AI plant diagnosis',
    'plant care app',
    'plant disease detection',
    'plant analytics',
    'smart gardening',
    'AI gardening assistant',
    'botanical SaaS',
    'plant tracker',
    'plant health monitoring',
    'Gemini AI',
    'E4rth',
  ],

  authors: [
    {
      name: 'E4rth',
    },
  ],

  creator: 'E4rth',

  publisher: 'E4rth',

  category: 'technology',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',

    url: siteUrl,

    siteName,

    title,

    description,

    locale: 'en_US',

    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'E4rth',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title,

    description,

    creator: '@e4rth',

    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'E4rth',
      },
    ],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,

      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      {
        url: '/favicon.ico',
      },
    ],

    apple: [
      {
        url: '/apple-icon.png',
      },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',

  initialScale: 1,

  maximumScale: 1,

  themeColor: '#0b2315',
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
