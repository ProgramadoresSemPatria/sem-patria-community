import { memo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Icons } from '@/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { type LeaderboardScore } from '@/actions/leaderboard/types'

interface UserListItemProps {
  score: LeaderboardScore
  position: number
}

export const UserListItem = memo(({ score, position }: UserListItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    whileHover={{
      x: 5,
      scale: 1.01,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    }}
    transition={{ duration: 0.15 }}
  >
    <Link
      href={`/user/${score.user.username}`}
      className="flex items-center justify-between p-2 rounded-lg transition-all duration-200 hover:bg-muted/90 group flex-wrap"
    >
      <div className="flex items-center gap-x-2 sm:gap-x-3 min-w-0">
        <div className="h-6 w-6 sm:h-8 sm:w-8 bg-slate-400 dark:bg-slate-800/20 rounded-full flex items-center justify-center transition-all duration-200 group-hover:bg-primary/10">
          <span className="text-xs sm:text-sm text-white dark:text-muted-foreground transition-colors duration-200 group-hover:text-primary">
            {position}
          </span>
        </div>
        <div className="relative">
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10 ring-2 ring-gray-500/10 transition-all duration-200 group-hover:ring-2 group-hover:ring-primary/20">
            <AvatarImage
              src={score.user.imageUrl || ''}
              alt={score.user.name}
            />
            <AvatarFallback className="bg-muted">
              {score.user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {position <= 10 && (
            <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-primary/80">
              <Icons.award className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm sm:text-base text-gray-900 dark:text-white font-medium transition-colors duration-200 group-hover:text-primary truncate">
            {score.user.name}
          </span>
          <span className="text-xs text-muted-foreground transition-colors duration-200 group-hover:text-muted-foreground/80 truncate">
            @{score.user.username}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <div className="flex flex-wrap gap-1 justify-end">
          <span className="capitalize inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-400/20 transition-all duration-200 group-hover:bg-gray-400/20 group-hover:text-gray-600 dark:group-hover:text-gray-300">
            {score.user.position || 'Member'}
          </span>
          <span className="capitalize inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/30 transition-all duration-200 group-hover:bg-blue-400/20 group-hover:text-blue-300">
            {score.user.level}
          </span>
        </div>
        <span className="text-gray-900 dark:text-muted-foreground text-sm sm:text-base font-bold font-mono transition-all duration-200 group-hover:text-primary">
          {score.points}
          <span className="text-xs ml-1 opacity-70">pts</span>
        </span>
      </div>
    </Link>
  </motion.div>
))

UserListItem.displayName = 'UserListItem'
