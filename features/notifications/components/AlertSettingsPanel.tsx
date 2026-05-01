'use client'

import { useState } from 'react'
import type { NotificationSettings } from '@/types/notification'
import {
  getNotificationSettings,
  saveNotificationSettings,
} from '../services/notifications.service'

const rows: Array<{
  key: keyof NotificationSettings
  label: string
  description: string
}> = [
  {
    key: 'careReminders',
    label: 'Care reminders',
    description: 'Watering, fertilizer, and routine plant care.',
  },
  {
    key: 'scanAlerts',
    label: 'Scan alerts',
    description: 'Diagnosis completion and disease risk updates.',
  },
  {
    key: 'growthInsights',
    label: 'Growth insights',
    description: 'Health-score dips and timeline milestones.',
  },
  {
    key: 'realtimeToasts',
    label: 'Realtime toasts',
    description: 'Show live in-app alerts when events arrive.',
  },
]

export default function AlertSettingsPanel() {
  const [settings, setSettings] = useState<NotificationSettings>(() =>
    getNotificationSettings(),
  )

  const update = (key: keyof NotificationSettings) => {
    const next = {
      ...settings,
      [key]: !settings[key],
    }
    setSettings(next)
    saveNotificationSettings(next)
  }

  return (
    <div className="surface p-5">
      <h2 className="text-lg font-semibold">Notification Settings</h2>
      <div className="mt-4 space-y-3">
        {rows.map((row) => (
          <label
            key={row.key}
            className="flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-background/42 p-3"
          >
            <span>
              <span className="block text-sm font-medium">{row.label}</span>
              <span className="mt-1 block text-xs text-foreground/55">
                {row.description}
              </span>
            </span>
            <input
              type="checkbox"
              checked={settings[row.key]}
              onChange={() => update(row.key)}
              className="h-4 w-4 accent-e4rth-500"
            />
          </label>
        ))}
      </div>
    </div>
  )
}
