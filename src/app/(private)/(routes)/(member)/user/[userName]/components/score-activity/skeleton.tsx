import { Skeleton } from '@/components/ui/skeleton'
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle
} from '@/components/ui/timeline'

export const ScoreActivitySkeleton = () => {
  return (
    <Timeline>
      {[0].map(index => (
        <TimelineItem
          key={index}
          step={index}
          className="group-data-[orientation=vertical]/timeline:ms-10 group-data-[orientation=vertical]/timeline:not-last:pb-8"
        >
          <TimelineHeader>
            <TimelineSeparator className="bg-transparent group-data-[orientation=vertical]/timeline:-left-7" />
            <TimelineTitle className="mt-0.5 flex items-center gap-2">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-14" />
            </TimelineTitle>
            <TimelineIndicator className="flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7">
              <Skeleton className="h-6 w-6 rounded-full" />
            </TimelineIndicator>
          </TimelineHeader>
          <TimelineContent className="text-foreground mt-2 rounded-lg border px-4 py-3">
            <Skeleton className="h-4 w-full" />
            <TimelineDate className="mt-1 mb-0">
              <Skeleton className="h-4 w-24 mt-1" />
            </TimelineDate>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
