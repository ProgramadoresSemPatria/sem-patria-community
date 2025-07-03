'use client'

import type { ScoreHistoryItem } from '@/hooks/score-history/types'
import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const useScoreTimeline = (
  initialData: ScoreHistoryItem[] = [],
  page: number,
  limit: number,
  total: number
) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageCount = Math.ceil(total / limit)

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage < 1 || newPage > pageCount) return

      const params = new URLSearchParams(searchParams.toString())
      params.set('page', newPage.toString())
      router.push(`${pathname}?${params.toString()}`)
    },
    [pageCount, pathname, router, searchParams]
  )

  const formatSourceType = (type: string) => {
    const types: Record<string, string> = {
      FORUM_POST_LIKE: 'like in a forum post',
      FORUM_POST_COMMENT_LIKE: 'like in a forum comment',
      COURSE_RECOMMENDATION: 'recommend a course'
    }

    return types[type] || type
  }

  const formatTimeAgo = (date: string | Date) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: enUS
    })
  }

  return {
    data: initialData,
    page,
    pageCount,
    handlePageChange,
    formatSourceType,
    formatTimeAgo
  }
}

export default useScoreTimeline
