'use client'

import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { type EventApiProps } from './types'

export const useWeekEvents = () => {
  return useQuery<EventApiProps>({
    queryKey: ['events'],
    queryFn: async () => {
      // get the current week start date from the beggining of the week and end date
      const currentWeekStartDate = new Date()
      currentWeekStartDate.setDate(
        currentWeekStartDate.getDate() - currentWeekStartDate.getDay()
      )
      const currentWeekEndDate = new Date()

      currentWeekEndDate.setDate(currentWeekStartDate.getDate() + 6)
      const { data } = await api.get<EventApiProps>(
        `/api/event?startDate=${currentWeekStartDate}&endDate=${currentWeekEndDate}`
      )
      return data
    }
  })
}

export const useAllEvents = () => {
  return useQuery<EventApiProps>({
    queryKey: ['allEvents'],
    queryFn: async () => {
      const { data } = await api.get<EventApiProps>(`/api/event`)
      return data
    }
  })
}
