'use client'

import ErrorState from '@/components/feedback/ErrorState'
import Loader from '@/components/feedback/Loader'
import AlertSettingsPanel from '@/features/notifications/components/AlertSettingsPanel'
import LiveAlertToast from '@/features/notifications/components/LiveAlertToast'
import ReminderCard from '@/features/notifications/components/ReminderCard'
import { useNotifications } from '@/features/notifications/hooks/useNotifications'

export default function NotificationsPage() {
  const { error, loading, markAllRead, notifications, refresh, unreadCount } =
    useNotifications()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Notifications</h2>
          <p className="mt-1 text-sm text-foreground/70">
            Live plant alerts, scan completions, and care reminders.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <LiveAlertToast />
          <button
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50"
          >
            Mark all read
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Inbox</h3>
            <span className="text-xs text-foreground/50">
              {unreadCount} unread
            </span>
          </div>

          {loading ? (
            <Loader label="Loading notifications" />
          ) : error ? (
            <ErrorState message={error} onRetry={refresh} />
          ) : notifications.length === 0 ? (
            <p className="text-sm text-foreground/60">No notifications yet.</p>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <ReminderCard
                  key={notification.id}
                  title={(notification.type ?? 'plant_alert').replaceAll(
                    '_',
                    ' ',
                  )}
                  description={notification.message}
                  tone={notification.isRead ? 'default' : 'urgent'}
                />
              ))}
            </div>
          )}
        </div>

        <AlertSettingsPanel />
      </div>
    </div>
  )
}
