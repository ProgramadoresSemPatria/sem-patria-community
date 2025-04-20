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
          {topThree.map((score, index) => (
            <CarouselItem
              key={score.user.id}
              className="basis-[85%] md:basis-1/3"
            >
              <LeaderboardCard score={score} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="md:hidden" />
        <CarouselNext className="md:hidden" />
      </Carousel>

      <div className="hidden md:flex flex-row gap-4 justify-center">
        {topThree.map((score, index) => (
          <div key={score.user.id} className="w-1/3 max-w-[340px]">
            <LeaderboardCard score={score} index={index} />
          </div>
        ))}
      </div>
    </div>
  )
}
