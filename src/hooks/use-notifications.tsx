'use client'

import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data } = await api.get('/api/courses/pending')
      return data
    }
  })
}
