'use client'

import AlertSettingsPanel from '@/features/notifications/components/AlertSettingsPanel'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Settings</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Tune E4rth around your plant care workflow.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="glass rounded-2xl border border-white/10 p-5">
          <h3 className="text-lg font-semibold">Account</h3>
          <p className="mt-2 text-sm leading-6 text-foreground/65">
            Authentication and profile details are managed through Clerk.
            Payment settings are intentionally disabled for this release.
          </p>
        </div>

        <AlertSettingsPanel />
      </div>
    </div>
  )
}
