import { Skeleton } from '@/components/ui/skeleton'
import {
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle
} from '@/components/ui/timeline'

const ScoreTimelineSkeleton = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Score Activities</h2>

      <Timeline>
        {Array.from({ length: 5 }).map((_, index) => (
          <TimelineItem
            key={index}
            step={index}
            className="group-data-[orientation=vertical]/timeline:ms-10 group-data-[orientation=vertical]/timeline:not-last:pb-8"
          >
            <TimelineHeader>
              <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
              <TimelineTitle className="mt-0.5 flex items-center gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-5 w-32" />
              </TimelineTitle>
              <TimelineIndicator className="flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7">
                <Skeleton className="h-9 w-9 rounded-full" />
              </TimelineIndicator>
            </TimelineHeader>
            <TimelineContent className="mt-2 rounded-lg border px-4 py-3">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-24 mt-2" />
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}

export default ScoreTimelineSkeleton
