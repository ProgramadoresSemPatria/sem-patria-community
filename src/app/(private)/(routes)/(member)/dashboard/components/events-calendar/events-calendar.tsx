'use client'
import { Icons } from '@/components/icons'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import React from 'react'

export const EventsCalendar = () => {
  const [date] = React.useState<Array<{ date: Date; hour: string }>>([
    // fill with dummy dates
    { date: new Date(2024, 0, 22), hour: '16h' },
    { date: new Date(2024, 0, 26), hour: '18h' },
    { date: new Date(2024, 0, 29), hour: '20h' }
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <Icons.calendarDays />
          Next events of the community
        </CardTitle>
        <CardDescription>
          Plan your time and don&apos;t miss any event
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-start items-start">
        <Calendar
          mode="multiple"
          selected={date.map(d => d.date)}
          className="rounded-md border w-fit"
        />
        <section className="flex flex-col gap-4 mx-auto">
          <div className="flex gap-1 items-center ">
            <Icons.calendarClock className="h-4 w-4" />{' '}
            <span className="font-semibold">
              You have {date?.length} events this week.
            </span>
          </div>
          {date?.map((date, i) => (
            <div key={i} className="flex items-center text-sm gap-3">
              <div className="rounded-full w-2 h-2 bg-blue-700" />
              <div className="flex flex-col">
                <span className="font-semibold">Event #{i + 1}</span>
                <span className="text-xs text-muted-foreground">
                  {date.date.toLocaleDateString()} - {date.hour}
                </span>
              </div>
            </div>
          ))}
        </section>
      </CardContent>
    </Card>
  )
}
