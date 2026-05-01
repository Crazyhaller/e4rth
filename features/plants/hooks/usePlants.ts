'use client'

import { useCallback, useEffect, useState } from 'react'

import type { Plant } from '@/types/plant'

import { getPlants } from '../services/plants.service'

interface UsePlantsReturn {
  plants: Plant[]
  loading: boolean
  error: string | null
  refreshPlants: () => Promise<void>
}

export function usePlants(): UsePlantsReturn {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /* =========================================
     FETCH PLANTS
  ========================================= */

  const refreshPlants = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await getPlants()

      setPlants(data)
    } catch (err) {
      console.error(err)

      setError('Failed to fetch plants')
    } finally {
      setLoading(false)
    }
  }, [])

  /* =========================================
     INITIAL LOAD
  ========================================= */

  useEffect(() => {
    const fetch = async () => {
      try {
        setError(null)

        const data = await getPlants()

        setPlants(data)
      } catch (err) {
        console.error(err)

        setError('Failed to fetch plants')
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [])

  return {
    plants,
    loading,
    error,
    refreshPlants,
  }
}
