import { Icons } from '@/components/icons'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { formatExternalUrl } from '@/lib/utils'
import { type Event } from '@prisma/client'

interface EventComponentProps {
  event: Event
}

export const EventComponent = ({ event }: EventComponentProps) => {
  // ! This is a workaround to fix the timezone issue
  const date = new Date(event.date)
  const offset = date.getTimezoneOffset()
  const adjustedDate = new Date(date.getTime() + offset * 60 * 1000)
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center text-sm gap-3 px-2 py-1 rounded-md hover:bg-slate-900">
          <div className="rounded-full w-2 h-2 bg-blue-700" />
          <div className="flex flex-col">
            <span className="font-semibold truncate">{event.title}</span>
            <span className="text-xs text-muted-foreground">
              {adjustedDate.toLocaleDateString()} - {adjustedDate.getHours()}:
              {adjustedDate.getMinutes()}
            </span>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent side="left" align="center" className="bg-slate-900">
        <div className="flex flex-col gap-2 p-2">
          <div className="flex flex-col">
            <span className="font-semibold text-lg">{event.title}</span>
            <span className="text-muted-foreground text-sm">
              {adjustedDate.toLocaleDateString()} - {adjustedDate.getHours()}:
              {adjustedDate.getMinutes()}
            </span>
          </div>
          <span className="italic">{event.description}</span>
          {event.specialGuest && (
            <div className="flex gap-2 items-center">
              <Icons.sparkles className="w-4 h-4" />
              {event.specialGuest}
            </div>
          )}
          {event.externalUrl && (
            <div className="mt-2">
              <span className="font-semibold">Link: </span>
              <a
                href={formatExternalUrl(event.externalUrl) ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {event.externalUrl}
              </a>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
