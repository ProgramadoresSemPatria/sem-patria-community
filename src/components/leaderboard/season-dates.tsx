'use client'

import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

interface SeasonDatesProps {
  initDate: Date | string
  endDate: Date | string
}

export const SeasonDates = ({ initDate, endDate }: SeasonDatesProps) => {
  const formatDateForDisplay = (date: Date | string) => {
    try {
      return format(new Date(date), 'dd/MM/yyyy HH:mm zzz', {
        locale: enUS
      })
    } catch {
      return format(new Date(date), 'P p', { locale: enUS })
    }
  }

  const renderDate = (label: string, dateValue: Date | string) => (
    <p>
      <span className="font-medium">{label}:</span>{' '}
      <span>{formatDateForDisplay(dateValue)}</span>
    </p>
  )

  return (
    <div className="flex flex-col gap-1">
      {renderDate('Start', initDate)}
      {renderDate('End', endDate)}
    </div>
  )
}
