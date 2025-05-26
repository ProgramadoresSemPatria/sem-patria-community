'use client'

import AvatarPlaceholder from '@/assets/avatar.png'
import { Badge } from '@/components/ui/badge'
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
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'
import Image from 'next/image'
import { ScoreActivitySkeleton } from './skeleton'
import { useScoreActivity } from './use-score-activity'
import Link from 'next/link'

type ScoreActivityProps = {
  userId: string
}

const ScoreActivity = ({ userId }: ScoreActivityProps) => {
  const { scoreActivity, isLoadingScoreActivity, formatSourceType } =
    useScoreActivity({
      userId
    })

  if (isLoadingScoreActivity) {
    return <ScoreActivitySkeleton />
  }

  return (
    <>
      {!scoreActivity?.data?.activities?.length && (
        <div className="flex h-full items-center">
          <p className="text-muted-foreground font-semibold">
            No score activity found.
          </p>
        </div>
      )}

      <Timeline>
        {scoreActivity?.data?.activities?.map((item, index) => (
          <TimelineItem
            key={item.id}
            step={index}
            className="group-data-[orientation=vertical]/timeline:ms-10 group-data-[orientation=vertical]/timeline:not-last:pb-8"
          >
            <TimelineHeader>
              <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
              <TimelineTitle className="mt-0.5 flex items-center gap-2">
                <Badge
                  className={cn(
                    'text-white gap-x-2 hover:bg-transparent',
                    'inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/30 hover:bg-gray-400/20'
                  )}
                >
                  {item.season.name}
                </Badge>
                <Link href={`/user/${item.user.id}`}>{item.user.name}</Link>
              </TimelineTitle>
              <TimelineIndicator className="bg-primary/10 w-8 h-8 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7">
                <Image
                  src={item.user.imageUrl ?? AvatarPlaceholder}
                  alt={item.user.name}
                  className="size-full rounded-full"
                  width={56}
                  height={56}
                />
              </TimelineIndicator>
            </TimelineHeader>
            <TimelineContent className="text-foreground mt-2 rounded-lg border px-4 py-3">
              You received {item.points}{' '}
              {item.points === 1 ? 'point' : 'points'} for{' '}
              {formatSourceType(item.source.type)}
              <TimelineDate className="mt-1 mb-0">
                {formatDistanceToNow(new Date(item.date), {
                  addSuffix: true,
                  locale: enUS
                })}
              </TimelineDate>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </>
  )
}

export default ScoreActivity
