'use client'
import { Icons } from '@/components/icons'
import { SkeletonDefault } from '@/components/skeletons/skeleton-default'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { type EventApiProps } from '@/hooks/event/types'
import { useAllEvents, useWeekEvents } from '@/hooks/event/use-event'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { EventComponent } from './event-component'
import { EventsTitle } from './events-title'

type EventsCalendarProps = {
  isWidget?: boolean
  initialDate?: string
  initialEventId?: string
}

export const EventsCalendar = ({
  isWidget = false,
  initialDate,
  initialEventId
}: EventsCalendarProps) => {
  const { data, isLoading } = useWeekEvents()
  const { data: allEvents } = useAllEvents()

  const [selectedDayEvents, setSelectedDayEvents] = useState<EventApiProps>()
  const [selectedDay, setSelectedDay] = useState<Date>()

  const eventsTitle: string = useMemo(() => {
    if (isLoading) {
      return 'Loading events...'
    }

    if (selectedDayEvents && selectedDay) {
      const parsedSelectedDay = format(new Date(selectedDay), 'dd/MM')

      if (selectedDayEvents.length === 0)
        return `We have no events on ${parsedSelectedDay}`

      return `We have ${selectedDayEvents?.length} events on ${parsedSelectedDay}`
    }

    if (data && data?.length > 0) {
      return `We have ${data?.length} events this week`
    }

    return 'No events today'
  }, [data, isLoading, selectedDay, selectedDayEvents])

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

  useEffect(() => {
    if (initialEventId && allEvents) {
      const event = allEvents.find(e => e.id === initialEventId)
      if (event) {
        handleClickDay(new Date(event.date))
      }
    }
  }, [initialDate, initialEventId, allEvents, handleClickDay])

  if (isWidget) {
    return (
      <div className="flex flex-col gap-y-2">
        <h2 className="text-lg font-semibold">Next events of the community</h2>
        <Card className="lg:h-44">
          <CardHeader className="flex p-3">
            <CardTitle className="flex items-center justify-between gap-x-2">
              <EventsTitle
                title={eventsTitle}
                hasSelectedDay={selectedDay !== undefined}
                onClick={() => {
                  setSelectedDayEvents(undefined)
                  setSelectedDay(undefined)
                }}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      'flex items-center text-left font-normal text-foreground gap-x-1'
                    )}
                  >
                    <Icons.calendarDays className="w-4 h-4 text-foreground" />
                    {(selectedDay && format(selectedDay, 'dd MMM, yyy')) ??
                      format(Date.now(), 'dd MMM, yyy')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    initialFocus
                    mode="multiple"
                    selected={allEvents?.map(d => new Date(d.date))}
                    className="rounded-md border w-fit"
                    onDayClick={handleClickDay}
                  />
                </PopoverContent>
              </Popover>
            </CardTitle>
          </CardHeader>
          <ScrollArea className="max-h-28 overflow-y-auto">
            <CardContent className="flex flex-col gap-2 md:gap-0 justify-start items-start p-0 pb-4">
              <section className="flex flex-col gap-4 w-full px-4">
                {isLoading ? (
                  <Icons.loader className="w-4 h-4 animate-spin" />
                ) : eventsDisplay && eventsDisplay.length > 0 ? (
                  eventsDisplay.map(event => (
                    <EventComponent key={event.id} event={event} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-4">
                    <Icons.calendar className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No events for this day
                    </p>
                  </div>
                )}
              </section>
            </CardContent>
          </ScrollArea>
        </Card>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between gap-2 items-center">
          <div className="flex items-center gap-x-2">
            <Icons.calendarDays />
            <span>Next events of the community</span>
          </div>
        </CardTitle>
        <CardDescription>
          Plan your time and don&apos;t miss any event.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 md:gap-0 md:flex-row justify-start items-start p-4 h-full">
        <Calendar
          mode="multiple"
          selected={allEvents?.map(d => new Date(d.date))}
          className="rounded-md border w-fit"
          onDayClick={handleClickDay}
          month={
            typeof initialDate === 'string' ? new Date(initialDate) : undefined
          }
        />

        <section className="flex flex-col gap-4 pl-4 overflow-y-auto max-h-72 max-w-sm">
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
            eventsDisplay?.map(event => (
              <EventComponent key={event.id} event={event} />
            ))
          )}
        </section>
      </CardContent>
    </Card>
  )
}
