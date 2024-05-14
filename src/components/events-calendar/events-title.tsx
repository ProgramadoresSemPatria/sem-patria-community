import { Icons } from '@/components/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

interface EventsTitleProps {
  title: string
  onClick: () => void
  hasSelectedDay: boolean
}
export const EventsTitle = ({
  title,
  hasSelectedDay,
  onClick
}: EventsTitleProps) => {
  return (
    <div className="flex gap-1 items-center ">
      <Icons.calendarClock className="h-4 w-4" />{' '}
      <span className="font-semibold">{title}</span>
      {hasSelectedDay && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Icons.close
                className="cursor-pointer w-4 h-4"
                onClick={onClick}
              />
            </TooltipTrigger>
            <TooltipContent>
              <span>Clear selected day</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}
