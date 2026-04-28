'use client'

import { Toaster } from 'sonner'

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      theme="dark"
      toastOptions={{
        className: '!bg-[#112118] !border !border-white/10 !text-white',
      }}
    />
  )
}
