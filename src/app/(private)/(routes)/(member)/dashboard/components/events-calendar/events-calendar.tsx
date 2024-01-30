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

export const EventsCalendar = () => {
  const { data, isLoading } = useEvent()

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
            <span className="font-semibold">
              {isLoading
                ? 'Loading events...'
                : `You have ${data?.length} events this week.`}
            </span>
          </div>

          {isLoading ? (
            <SkeletonDefault />
          ) : (
            data?.map((date, i) => (
              <div key={i} className="flex items-center text-sm gap-3">
                <div className="rounded-full w-2 h-2 bg-blue-700" />
                <div className="flex flex-col">
                  <span className="font-semibold truncate">{date.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(date.date).toLocaleDateString()} -{' '}
                    {new Date(date.date).getHours()}:
                    {new Date(date.date).getMinutes()}
                  </span>
                </div>
              </div>
            ))
          )}
        </section>
      </CardContent>
    </Card>
  )
}
