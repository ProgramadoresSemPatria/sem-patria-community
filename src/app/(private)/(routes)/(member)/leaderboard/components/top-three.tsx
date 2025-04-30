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

interface TopThreeProps {
  scores: LeaderboardScore[]
}

export const TopThree = ({ scores }: TopThreeProps) => {
  if (!scores) return null

  const topThree = [...scores].slice(0, 3).sort((a, b) => b.points - a.points)
  const reorderedTopThree = [topThree[1], topThree[0], topThree[2]].filter(
    Boolean
  )

  if (topThree.length === 0) {
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
        className="md:hidden"
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
        <CarouselPrevious className="md:hidden" />
        <CarouselNext className="md:hidden" />
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
