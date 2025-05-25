'use client'

import Link from 'next/link'
import { Icons } from '@/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { type LeaderboardScore } from '@/actions/leaderboard/types'
import { formatPoints, getLevelStyle, getPositionStyle } from './utils'

interface LeaderboardCardProps {
  score: LeaderboardScore
  index: number
}

const LeaderboardCard = ({ score, index }: LeaderboardCardProps) => {
  return (
    <Link
      href={`/user/${score.user.username}`}
      className="group cursor-pointer"
    >
      <div
        className={cn(
          'relative flex-shrink-0 transition-transform duration-200 ease-out',
          'hover:translate-y-[-4px]',
          index === 0 && 'md:z-10 md:scale-105'
        )}
      >
        <div
          className={cn(
            'relative w-full rounded-xl p-3',
            'bg-gradient-to-br transition-colors duration-200',
            index === 0
              ? 'from-yellow-400/30 to-amber-600/30 border-yellow-500/40 shadow-lg shadow-yellow-500/20 group-hover:from-yellow-400/40 group-hover:to-amber-600/40'
              : index === 1
                ? 'from-gray-400/20 to-gray-600/20 border-gray-500/30 group-hover:from-gray-400/30 group-hover:to-gray-600/30'
                : 'from-orange-400/20 to-orange-600/20 border-orange-500/30 group-hover:from-orange-400/30 group-hover:to-orange-600/30',
            'border-2 backdrop-blur-lg'
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer" />
          <div className="relative flex flex-col items-center gap-3">
            <div className="text-sm font-semibold opacity-50">
              &#35;{index + 1}
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
                &#64;{score.user.username}
              </div>
            </div>
            <div className="mt-auto">
              <div className="text-xl md:text-2xl font-mono font-bold">
                {formatPoints(score.points)}
                <span className="text-[10px] md:text-sm ml-1 opacity-70">
                  pts
                </span>
              </div>
            </div>
            <div className="w-full flex flex-wrap gap-2 justify-center">
              {score.user.level && (
                <span
                  className={cn(
                    'capitalize inline-flex items-center rounded-md px-2 py-1',
                    'text-xs font-medium ring-1 ring-inset',
                    getLevelStyle(score.user.level)
                  )}
                >
                  {score.user.level}
                </span>
              )}
              {score.user.position && (
                <span
                  className={cn(
                    'inline-flex items-center rounded-md px-1.5 sm:px-2 py-0.5 sm:py-1',
                    'text-[10px] sm:text-xs font-medium ring-1 ring-inset',
                    getPositionStyle(score.user.position)
                  )}
                >
                  {score.user.position?.charAt(0).toUpperCase() +
                    score.user.position?.toLowerCase().slice(1)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default LeaderboardCard
