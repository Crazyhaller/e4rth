'use client'

import { Toaster } from 'sonner'
import { useTheme } from './ThemeProvider'

export default function ToastProvider() {
  const { theme } = useTheme()

  return (
    <Toaster
      position="top-right"
      richColors
      theme={theme}
      toastOptions={{
        className:
          theme === 'dark'
            ? '!bg-[#21170f] !border !border-white/10 !text-[#f3ead8]'
            : '!bg-[#f8f1e2] !border !border-[#c9b692] !text-[#2c1d12]',
      }}
    />
  )
}
