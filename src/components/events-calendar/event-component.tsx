import { Icons } from '@/components/icons'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger>
              <div className="flex items-center text-sm p-1 rounded-md dark:hover:bg-muted">
                <div className="flex flex-col">
                  <span className="text-left font-semibold text-sm text-ellipsis line-clamp-1">
                    {event.title}
                  </span>
                  <span className="text-left text-xs text-muted-foreground">
                    {adjustedDate.toLocaleDateString()} -{' '}
                    {adjustedDate.getHours()}:
                    {adjustedDate.getMinutes() < 10
                      ? `0${adjustedDate.getMinutes()}`
                      : adjustedDate.getMinutes()}
                  </span>
                </div>
              </div>
              <TooltipContent className="dark:bg-muted bg-white text-foreground">
                <span>See more details</span>
              </TooltipContent>
            </PopoverTrigger>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent side="left" align="center" className="dark:bg-card">
        <div className="flex flex-col gap-2 p-2">
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-ellipsis line-clamp-3">
              {event.title}
            </span>
            <span className="text-muted-foreground text-sm">
              {adjustedDate.toLocaleDateString()} - {adjustedDate.getHours()}:
              {adjustedDate.getMinutes() < 10
                ? `0${adjustedDate.getMinutes()}`
                : adjustedDate.getMinutes()}
            </span>
          </div>
          <span className="italic line-clamp-4 text-ellipsis">
            {event.description}
          </span>
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
