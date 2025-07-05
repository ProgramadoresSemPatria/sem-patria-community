'use client'

import { useNote } from '@/hooks/note/use-note'
import {
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  format,
  isSameDay,
  startOfYear
} from 'date-fns'
import { useMemo, useState } from 'react'

const useContributionPanel = () => {
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { useGetUserNotes } = useNote()

  const { data: response, isLoading: isLoadingActiveDates } = useGetUserNotes({
    refetchOnWindowFocus: true,
    queryKey: ['getScoreHistoryByUserId'],
    staleTime: 0
  })

  const rawNotes = response?.data ?? []

  const activeDates: string[] = Array.from(
    new Set(rawNotes.map((note: { createdAt: string }) => note.createdAt))
  )

  const today = new Date()
  const startDate = startOfWeek(startOfYear(today), { weekStartsOn: 0 })
  const endDate = endOfWeek(new Date(today.getFullYear(), 11, 31), {
    weekStartsOn: 0
  })

  const allDays = useMemo(() => {
    return eachDayOfInterval({ start: startDate, end: endDate })
  }, [startDate, endDate])

  const isActive = (date: Date) =>
    activeDates?.some(d => isSameDay(new Date(d), date)) || false

  const weeks = useMemo(() => {
    const result: Date[][] = []
    let week: Date[] = []

    allDays.forEach(day => {
      if (week.length === 7) {
        result.push(week)
        week = []
      }
      week.push(day)
    })

    if (week.length) {
      while (week.length < 7) {
        week.push(new Date())
      }
      result.push(week)
    }

    return result
  }, [allDays])

  const getMonthLabel = (date: Date) => format(date, 'MMM')

  const handleMouseEnter = (date: Date, event: React.MouseEvent) => {
    setHoveredDate(date)
    setMousePosition({ x: event.clientX, y: event.clientY })
  }

  const handleMouseLeave = () => {
    setHoveredDate(null)
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    if (hoveredDate) {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }
  }

  const numberOfContributions = activeDates?.length || 0

  return {
    weeks,
    hoveredDate,
    mousePosition,
    isActive,
    getMonthLabel,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
    numberOfContributions,
    isLoadingActiveDates,
    activeDates
  }
}

export default useContributionPanel
