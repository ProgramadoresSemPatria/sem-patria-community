'use client'

import { type LeaderboardScore } from '@/actions/leaderboard/types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import LeaderboardCard from './leaderboard-card'
import TopThreeEmptyState from './top-three-empty-state'
import { useMemo } from 'react'

interface TopThreeProps {
  scores: LeaderboardScore[]
}

export const TopThree = ({ scores }: TopThreeProps) => {
  const { topThree, reorderedTopThree } = useMemo(() => {
    if (!scores?.length) return { topThree: [], reorderedTopThree: [] }

    const sorted = [...scores].slice(0, 3).sort((a, b) => b.points - a.points)
    const reordered = [sorted[1], sorted[0], sorted[2]].filter(Boolean)

    return { topThree: sorted, reorderedTopThree: reordered }
  }, [scores])

  if (!scores?.length) {
    return <TopThreeEmptyState />
  }

  return (
    <div className="w-full px-4 md:px-2">
      <Carousel
        opts={{
          align: 'start',
          loop: false,
          dragFree: true
        }}
        className="md:hidden relative"
      >
        <CarouselContent>
          {reorderedTopThree.map((score, index) => {
            const originalIndex = topThree.findIndex(
              s => s.user.id === score.user.id
            )
            return (
              <CarouselItem
                key={score.user.id}
                className="basis-[85%] md:basis-1/3"
              >
                <LeaderboardCard score={score} index={originalIndex} />
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>

      <div className="hidden md:flex flex-row gap-4 justify-center">
        {reorderedTopThree.map(score => {
          const originalIndex = topThree.findIndex(
            s => s.user.id === score.user.id
          )
          return (
            <div key={score.user.id} className="w-1/3 max-w-[340px]">
              <LeaderboardCard score={score} index={originalIndex} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
