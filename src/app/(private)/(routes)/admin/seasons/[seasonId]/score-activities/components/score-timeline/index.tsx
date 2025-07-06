'use client'

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
import { type ScoreHistoryItem } from '@/hooks/score-history/types'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import useScoreTimeline from './use-score-timeline'
import { appRoutes } from '@/lib/constants'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import BackButton from '@/components/back-button'
import { DOTS, usePagination } from '@/hooks/use-pagination'

type ScoreTimelineProps = {
  initialData?: ScoreHistoryItem[]
  page: number
  limit: number
  total: number
}

const ScoreTimeline = ({
  initialData = [],
  page,
  limit,
  total
}: ScoreTimelineProps) => {
  const { data, pageCount, handlePageChange, formatSourceType, formatTimeAgo } =
    useScoreTimeline(initialData, page, limit, total)

  const paginationRange = usePagination({
    pageCount,
    page
  })

  const renderPagination = () => {
    if (pageCount <= 1 || !paginationRange) return null

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={e => {
                e.preventDefault()
                handlePageChange(page - 1)
              }}
              aria-disabled={page <= 1}
              className={cn({
                'pointer-events-none opacity-50': page <= 1
              })}
            />
          </PaginationItem>
          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
              return (
                <PaginationItem key={`${DOTS}-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  onClick={e => {
                    e.preventDefault()
                    handlePageChange(pageNumber as number)
                  }}
                  isActive={pageNumber === page}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          })}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={e => {
                e.preventDefault()
                handlePageChange(page + 1)
              }}
              aria-disabled={page >= pageCount}
              className={cn({
                'pointer-events-none opacity-50': page >= pageCount
              })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <BackButton route={appRoutes.admin_seasons} />
        <h2 className="text-2xl font-bold">Score Activities</h2>
      </div>

      {data.length === 0 ? (
        <div className="flex h-full items-center">
          <p className="text-muted-foreground font-semibold">
            No score activities found.
          </p>
        </div>
      ) : (
        <>
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
                        href={`/user/${item.user.username}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {item.user.name}
                      </Link>{' '}
                      generated {item.points} points for{' '}
                      <Link
                        href={`/user/${item.target.username}`}
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
          </Timeline>
          {renderPagination()}
        </>
      )}
    </div>
  )
}

export default ScoreTimeline
