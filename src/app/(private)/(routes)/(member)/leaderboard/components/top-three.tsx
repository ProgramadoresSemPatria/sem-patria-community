'use client'

import { Icons } from '@/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { type LeaderboardScore } from '@/actions/leaderboard/types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

interface TopThreeProps {
  scores: LeaderboardScore[]
}

export const TopThree = ({ scores }: TopThreeProps) => {
  if (!scores) return null

  const topThree = [...scores].slice(0, 3).sort((a, b) => b.points - a.points)

  if (topThree.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-4 text-center">
        <Icons.trophy className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-muted-foreground">
          Nobody scored
        </h3>
        <p className="text-sm text-muted-foreground/70 mt-1">
          Be the first to join the leaderboard
        </p>
      </div>
    )
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
              <Link
                href={`/user/${score.user.username}`}
                className="group cursor-pointer"
              >
                <motion.div
                  className={cn(
                    'relative flex-shrink-0',
                    index === 0 && 'md:z-10 md:scale-105'
                  )}
                  initial={{ rotateY: 180 }}
                  animate={{ rotateY: 0 }}
                  whileHover={{
                    scale: 1.05,
                    transition: { type: 'spring', stiffness: 200, damping: 15 }
                  }}
                  transition={{
                    delay: index * 0.2,
                    type: 'spring',
                    stiffness: 200
                  }}
                >
                  <div
                    className={cn(
                      'relative w-full rounded-xl p-3',
                      'bg-gradient-to-br',
                      index === 0
                        ? 'from-yellow-400/20 to-amber-600/20 border-yellow-500/30'
                        : index === 1
                          ? 'from-gray-400/20 to-gray-600/20 border-gray-500/30'
                          : 'from-orange-400/20 to-orange-600/20 border-orange-500/30',
                      'border-2 backdrop-blur-lg'
                    )}
                  >
                    {/* Holographic Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer" />

                    <div className="relative flex flex-col items-center gap-3">
                      <div className="text-xs font-bold opacity-50">
                        #{index + 1}
                      </div>
                      <div className="relative">
                        <Avatar className="w-16 h-16 md:w-24 md:h-24 ring-2 ring-gray-600/20 dark:ring-4 dark:ring-white/10">
                          <AvatarImage
                            src={score.user.imageUrl || ''}
                            alt={score.user.name}
                          />
                          <AvatarFallback className="bg-muted">
                            {score.user.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={cn(
                            'absolute -bottom-0 -right-0 p-1 rounded-full',
                            index === 0
                              ? 'bg-yellow-500'
                              : index === 1
                                ? 'bg-gray-400'
                                : 'bg-orange-500'
                          )}
                        >
                          <Icons.award className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="mt-2 text-center">
                        <div className="font-bold text-base md:text-xl">
                          {score.user.name}
                        </div>
                        <div className="text-xs md:text-sm opacity-70">
                          @{score.user.username}
                        </div>
                      </div>

                      <div className="mt-auto">
                        <div className="text-2xl md:text-3xl font-mono font-bold">
                          {score.points}
                          <span className="text-xs md:text-sm ml-1 opacity-70">
                            pts
                          </span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="w-full mt-4 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Level</span>
                          <span>{score.user.level || 'Member'}</span>
                        </div>

                        <div className="flex justify-between text-xs">
                          <span>Position</span>
                          <span>{score.user.position || '-'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="md:hidden" />
        <CarouselNext className="md:hidden" />
      </Carousel>

      <div className="hidden md:flex flex-row gap-4 justify-center">
        {topThree.map((score, index) => (
          <div key={score.user.id} className="w-1/3 max-w-[340px]">
            <Link
              href={`/user/${score.user.username}`}
              className="group cursor-pointer"
            >
              <motion.div
                className={cn(
                  'relative flex-shrink-0',
                  index === 0 && 'md:z-10 md:scale-105'
                )}
                initial={{ rotateY: 180 }}
                animate={{ rotateY: 0 }}
                whileHover={{
                  scale: 1.05,
                  transition: { type: 'spring', stiffness: 200, damping: 15 }
                }}
                transition={{
                  delay: index * 0.2,
                  type: 'spring',
                  stiffness: 200
                }}
              >
                <div
                  className={cn(
                    'relative w-full rounded-xl p-3',
                    'bg-gradient-to-br',
                    index === 0
                      ? 'from-yellow-400/20 to-amber-600/20 border-yellow-500/30'
                      : index === 1
                        ? 'from-gray-400/20 to-gray-600/20 border-gray-500/30'
                        : 'from-orange-400/20 to-orange-600/20 border-orange-500/30',
                    'border-2 backdrop-blur-lg'
                  )}
                >
                  {/* Holographic Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer" />

                  <div className="relative flex flex-col items-center gap-3">
                    <div className="text-xs font-bold opacity-50">
                      #{index + 1}
                    </div>
                    <div className="relative">
                      <Avatar className="w-16 h-16 md:w-24 md:h-24 ring-2 ring-gray-600/20 dark:ring-4 dark:ring-white/10">
                        <AvatarImage
                          src={score.user.imageUrl || ''}
                          alt={score.user.name}
                        />
                        <AvatarFallback className="bg-muted">
                          {score.user.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={cn(
                          'absolute -bottom-0 -right-0 p-1 rounded-full',
                          index === 0
                            ? 'bg-yellow-500'
                            : index === 1
                              ? 'bg-gray-400'
                              : 'bg-orange-500'
                        )}
                      >
                        <Icons.award className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <div className="font-bold text-base md:text-xl">
                        {score.user.name}
                      </div>
                      <div className="text-xs md:text-sm opacity-70">
                        @{score.user.username}
                      </div>
                    </div>
                    <div className="mt-auto">
                      <div className="text-2xl md:text-3xl font-mono font-bold">
                        {score.points}
                        <span className="text-xs md:text-sm ml-1 opacity-70">
                          pts
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex flex-wrap gap-2 justify-center">
                      <span className="capitalize inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-400/20">
                        {score.user.level || 'Member'}
                      </span>
                      <span className="capitalize inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/30">
                        {score.user.position || 'Member'}
                      </span>
                    </div>

                    {/* <div className="w-full mt-4 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Level</span>
                        <span>{score.user.level || 'Member'}</span>
                      </div>

                      <div className="flex justify-between text-xs">
                        <span>Position</span>
                        <span>{score.user.position || '-'}</span>
                      </div>
                    </div> */}
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
