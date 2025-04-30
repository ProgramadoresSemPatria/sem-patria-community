import { memo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { type LeaderboardScore } from '@/actions/leaderboard/types'
import { cn } from '@/lib/utils'
import { getLevelStyle, getPositionStyle } from './utils'

interface UserListItemProps {
  score: LeaderboardScore
  position: number
}

export const UserListItem = memo(({ score, position }: UserListItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.15 }}
  >
    <Link
      href={`/user/${score.user.username}`}
      className="flex items-center justify-between p-2 rounded-lg transition-all duration-200 group
        hover:bg-slate-100 dark:hover:bg-slate-800/50
        group-hover:shadow-md group-hover:border
        group-hover:border-slate-200 dark:group-hover:border-slate-700"
    >
      <div className="flex items-center gap-x-2 sm:gap-x-3 min-w-0 flex-1">
        <div className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0 drop-shadow-md shadow-md bg-slate-400 dark:bg-slate-800/50 rounded-full flex items-center justify-center transition-all duration-200">
          <span className="text-xs sm:text-sm font-medium text-white dark:text-slate-300 transition-colors duration-200">
            {position}
          </span>
        </div>
        <div className="relative flex-shrink-0">
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10 transition-all duration-200 ring-2 ring-gray-600/20 dark:ring-white/10">
            <AvatarImage
              src={score.user.imageUrl || ''}
              alt={score.user.name}
            />
            <AvatarFallback className="bg-muted text-sm">
              {score.user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {/* <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full">
            <Icons.award className="w-3 h-3" />
          </div> */}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm sm:text-base text-slate-900 dark:text-white font-semibold tracking-tight truncate">
            {score.user.name}
          </span>
          <span className="text-xs text-muted-foreground transition-colors duration-200 truncate whitespace-nowrap">
            &#64;{score.user.username}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-3">
        <div className="flex flex-wrap gap-1 sm:gap-2 justify-end">
          {score.user.position && (
            <span
              className={cn(
                'inline-flex items-center rounded-md px-1.5 sm:px-2 py-0.5 sm:py-1',
                'text-[10px] sm:text-xs font-medium ring-1 ring-inset',
                'transition-all duration-200',
                getPositionStyle(score.user.position)
              )}
            >
              {score.user.position?.charAt(0).toUpperCase() +
                score.user.position?.toLowerCase().slice(1)}
            </span>
          )}
          {score.user.level && (
            <span
              className={cn(
                'capitalize items-center rounded-md px-1.5 sm:px-2 py-0.5 sm:py-1',
                'text-[10px] sm:text-xs font-medium ring-1 ring-inset',
                'transition-all duration-200',
                getLevelStyle(score.user.level)
              )}
            >
              {score.user.level}
            </span>
          )}
        </div>
        <span
          className="text-slate-900 dark:text-slate-200 text-xs sm:text-base font-mono font-medium
          transition-all duration-200 group-hover:text-slate-900 dark:group-hover:text-white whitespace-nowrap"
        >
          {score.points}
          <span className="text-[10px] sm:text-xs ml-1 opacity-70 font-normal">
            pts
          </span>
        </span>
      </div>
    </Link>
  </motion.div>
))

UserListItem.displayName = 'UserListItem'
