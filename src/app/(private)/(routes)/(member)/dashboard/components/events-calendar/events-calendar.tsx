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
import { useEvent } from '@/hooks/event/use-event'
import { useMemo } from 'react'
import { EventComponent } from './event-component'

export const EventsCalendar = () => {
  const { data, isLoading } = useEvent()

  const eventsTitle = useMemo(() => {
    if (isLoading) {
      return 'Loading events...'
    }

    if (data && data?.length > 0) {
      return `You have ${data?.length} events this week.`
    }

    return 'No events this week.'
  }, [data, isLoading])
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
          selected={data?.map(d => new Date(d.date))}
          className="rounded-md border w-fit"
        />
        <section className="flex flex-col gap-4 mx-auto">
          <div className="flex gap-1 items-center ">
            <Icons.calendarClock className="h-4 w-4" />{' '}
            <span className="font-semibold">{eventsTitle}</span>
          </div>

          {isLoading ? (
            <SkeletonDefault />
          ) : (
            data?.map((event, i) => (
              <EventComponent key={event.id} event={event} />
            ))
          )}
        </section>
      </CardContent>
    </Card>
  )
}
