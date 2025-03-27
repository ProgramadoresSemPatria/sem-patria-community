'use client'

import { Badge } from '@/components/ui/badge'
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
import { ScoreHistoryItem } from '@/hooks/score-history/types'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import useScoreTimeline from './use-score-timeline'

type ScoreTimelineProps = {
  seasonId: string
  initialData?: ScoreHistoryItem[]
  initialDataCount?: number
}

const ScoreTimeline = ({
  seasonId,
  initialData = [],
  initialDataCount = 0
}: ScoreTimelineProps) => {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    ref,
    formatSourceType,
    formatTimeAgo
  } = useScoreTimeline(seasonId, initialData, initialDataCount)

  if (isLoading && data.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Score Activities</h2>

      {data.length === 0 ? (
        <div className="flex h-full items-center">
          <p className="text-muted-foreground font-semibold">
            No score activities found.
          </p>
        </div>
      ) : (
        <Timeline>
          {data.map((item, index) => (
            <TimelineItem
              key={item.id}
              step={index}
              className="group-data-[orientation=vertical]/timeline:ms-10 group-data-[orientation=vertical]/timeline:not-last:pb-8 mb-4"
            >
              <TimelineHeader>
                <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-6 group-data-[orientation=vertical]/timeline:h-full mt-1.5 group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                <TimelineTitle className="mt-0.5 flex items-center gap-2">
                  <Badge
                    className={cn(
                      'text-white gap-x-2 hover:bg-transparent',
                      'inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/30 hover:bg-gray-400/20'
                    )}
                  >
                    {item.season.name}
                  </Badge>
                </TimelineTitle>
                <TimelineIndicator className="h-4 w-4 border-2 border-muted-foreground bg-background absolute -left-9 mt-1.5" />
              </TimelineHeader>
              <TimelineContent className="text-foreground mt-2 rounded-lg border px-4 py-3">
                {item.target ? (
                  <>
                    <Link
                      href={`/user/${item.user.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {item.user.name}
                    </Link>{' '}
                    generated {item.points} points for{' '}
                    <Link
                      href={`/user/${item.target.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {item.target.name}
                    </Link>{' '}
                    by {formatSourceType(item.resource.resource)}
                  </>
                ) : (
                  <>
                    <Link
                      href={`/user/${item.user.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {item.user.name}
                    </Link>{' '}
                    received {item.points} points by{' '}
                    {formatSourceType(item.resource.resource)}
                  </>
                )}
                <TimelineDate className="mt-1 mb-0">
                  {formatTimeAgo(item.createdAt)}
                </TimelineDate>
              </TimelineContent>
            </TimelineItem>
          ))}

          <div ref={ref} className="h-10">
            {isFetchingNextPage && (
              <div className="flex justify-center py-4">
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            )}
          </div>
        </Timeline>
      )}
    </div>
  )
}

export default ScoreTimeline
