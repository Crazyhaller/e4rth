'use client'

import { useCallback, useEffect, useState } from 'react'
import type { GlobalAnalytics } from '@/types/analytics'
import { getGlobalAnalytics } from '../services/analytics.service'

export function useGlobalAnalytics() {
  const [analytics, setAnalytics] = useState<GlobalAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      setError(null)
      const data = await getGlobalAnalytics()
      setAnalytics(data)
    } catch (err) {
      console.error('Analytics fetch failed:', err)
      setError('Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const load = async () => {
      await refresh()
    }

    load()
  }, [refresh])

  return { analytics, error, loading, refresh }
}
