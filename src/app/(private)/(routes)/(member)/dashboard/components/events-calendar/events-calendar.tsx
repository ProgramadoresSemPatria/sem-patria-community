'use client'
import { Icons } from '@/components/icons'
import { SkeletonDefault } from '@/components/skeletons/skeleton-default'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { type EventApiProps } from '@/hooks/event/types'
import { useAllEvents, useWeekEvents } from '@/hooks/event/use-event'
import { format } from 'date-fns'
import { useCallback, useMemo, useState } from 'react'
import { EventComponent } from './event-component'
import { EventsTitle } from './events-title'

export const EventsCalendar = () => {
  const { data, isLoading } = useWeekEvents()
  const { data: allEvents } = useAllEvents()

  const [selectedDayEvents, setSelectedDayEvents] = useState<EventApiProps>()
  const [selectedDay, setSelectedDay] = useState<Date>()

  const eventsTitle: string = useMemo(() => {
    if (isLoading) {
      return 'Loading events...'
    }

    if (selectedDayEvents) {
      const selectedDay = format(new Date(selectedDayEvents[0].date), 'dd/MM')

      if (selectedDayEvents.length === 0)
        return `You have no events on ${selectedDay}`

      return `You have ${selectedDayEvents?.length} events on ${selectedDay}`
    }

    if (data && data?.length > 0) {
      return `You have ${data?.length} events this week`
    }

    return 'No events this week.'
  }, [data, isLoading, selectedDayEvents])

  const eventsDisplay = useMemo(() => {
    if (selectedDayEvents) {
      return selectedDayEvents
    }

    return data
  }, [data, selectedDayEvents])

  const handleClickDay = useCallback(
    (selectedDate: Date) => {
      const filteredEvents = allEvents?.filter(
        event =>
          new Date(event.date).toDateString() === selectedDate.toDateString()
      )
      setSelectedDayEvents(filteredEvents)
      setSelectedDay(selectedDate)
    },
    [allEvents]
  )

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
          selected={allEvents?.map(d => new Date(d.date))}
          className="rounded-md border w-fit"
          onDayClick={handleClickDay}
        />
        <section className="flex flex-col gap-4 mx-auto">
          <EventsTitle
            title={eventsTitle}
            hasSelectedDay={selectedDay !== undefined}
            onClick={() => {
              setSelectedDayEvents(undefined)
              setSelectedDay(undefined)
            }}
          />
          {isLoading ? (
            <SkeletonDefault />
          ) : (
            eventsDisplay?.map((event, i) => (
              <EventComponent key={event.id} event={event} />
            ))
          )}
        </section>
      </CardContent>
    </Card>
  )
}
