'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Scan } from '@/types/scan'
import { getScanHistory } from '../services/scan.service'

export function useScanHistory() {
  const [history, setHistory] = useState<Scan[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      setError(null)
      const data = await getScanHistory()
      setHistory(data)
    } catch (err) {
      console.error('History fetch failed:', err)
      setError('Failed to load scan history')
    } finally {
      setLoading(false)
    }
  }, [])

  const addOptimisticScan = useCallback((scan: Scan) => {
    setHistory((prev) => [scan, ...prev.filter((item) => item.id !== scan.id)])
    setActiveId(scan.id)
  }, [])

  useEffect(() => {
    const load = async () => {
      await refresh()
    }

    load()
  }, [refresh])

  return {
    activeId,
    addOptimisticScan,
    error,
    history,
    loading,
    refresh,
    setActiveId,
  }
}
