'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useScoreboard } from '@/hooks/scoreboard/use-scoreboard'
import { getHighestPriorityRole } from '@/lib/utils'
import { type User as ClerkUser } from '@clerk/nextjs/server'
import { type User } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useFollowersAndFollowings } from './useFollowersAndFollowings'
import { Icons } from '@/components/icons'
import { PositionIconMap, TRAIL_LABELS } from '@/lib/constants'
import { Positions, Roles } from '@/lib/types'
import { FollowersAndFollowingModal } from './FollowersAndFollowingModal'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { format } from 'date-fns'
import type { CurrentSeasonResponse } from '@/actions/leaderboard/types'
import { getCurrentSeason } from '@/actions/leaderboard/get-current-season'
import { useQuery } from '@tanstack/react-query'

const Header = ({
  user,
  currentUser
}: {
  user: User
  currentUser: ClerkUser
}) => {
  const { useGetScoreboardByUserId } = useScoreboard()
  const {
    follow,
    followers,
    unfollow,
    following,
    unfollowing,
    followedUsers,
    isLoadingFollowers: isFollowersLoading
  } = useFollowersAndFollowings(user.id)

  const {
    data: scoreboard,
    isLoading: isScoreboardLoading,
    refetch: refetchScoreboard
  } = useGetScoreboardByUserId(user.id)

  const { data: currentSeason, isLoading: isSeasonLoading } = useQuery({
    queryKey: ['getCurrentSeason-publicProfile'],
    queryFn: async () => await getCurrentSeason()
  })

  const [isFollowed, setIsFollowed] = useState(false)

  useEffect(() => {
    if (followers) {
      const isFollowing = followers.some(
        follower => follower.id === currentUser.id
      )
      setIsFollowed(isFollowing)
    }
  }, [currentUser.id, followers])

  const handleFollowToggle = async () => {
    if (isFollowed) {
      await unfollow(user.id)
    } else {
      await follow(user.id)
    }

    await refetchScoreboard()
  }

  const isCurrentUser = user.id === currentUser.id

  return (
    <div className="dark:shadow-lg rounded-lg space-y-4 mb-4">
      <div className="flex items-center gap-8 pb-6 border-b">
        <Avatar className="h-24 w-24 shadow-md">
          {user.imageUrl ? (
            <AvatarImage src={user.imageUrl} />
          ) : (
            <AvatarFallback>U</AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1 space-y-3">
          <h1 className="text-3xl font-bold flex items-center gap-3 flex-wrap">
            {user.name}
            <div className="flex items-center gap-2">
              <Badge className="text-sm py-1 px-3">
                {Roles[getHighestPriorityRole(user.role)]}
              </Badge>
              {user.position && (
                <Badge
                  variant="outline"
                  className="text-sm py-1 px-3 flex items-center gap-2"
                >
                  {PositionIconMap[user.position]}
                  {Positions[user.position]}
                </Badge>
              )}
            </div>
          </h1>
          <p className="text-gray-500 text-lg">@{user.username}</p>
          {user.trail && (
            <Badge
              variant="outline"
              className="py-1 px-3 flex items-center gap-2 w-fit  rounded-full border-secondary bg-secondary/20 text-secondary text-xs"
            >
              <Icons.bookOpen className="h-3 w-3 shrink-0" />
              <span className="truncate">
                {TRAIL_LABELS[user.trail as keyof typeof TRAIL_LABELS]}
              </span>
            </Badge>
          )}
          {!isCurrentUser && (
            <Button
              disabled={following || unfollowing}
              onClick={handleFollowToggle}
              variant="outline"
              className="text-sm mt-2 hover:bg-gray-400"
            >
              {following
                ? 'Following...'
                : unfollowing
                  ? 'Unfollowing...'
                  : isFollowed
                    ? 'Unfollow'
                    : 'Follow'}
            </Button>
          )}
        </div>
      </div>
      <div
        className={`grid gap-4 sm:gap-6 text-center ${
          user.referralCreditsBalance && user.referralCreditsBalance > 0
            ? 'grid-cols-2 sm:grid-cols-4'
            : 'grid-cols-3'
        }`}
      >
        <FollowersAndFollowingModal
          title="Followers"
          followersOrFollowing={followers}
        >
          <div className={followers.length === 0 ? '' : 'cursor-pointer'}>
            <Stat
              label="Followers"
              value={followers?.length ?? 0}
              isLoading={isFollowersLoading}
            />
          </div>
        </FollowersAndFollowingModal>
        <FollowersAndFollowingModal
          title="Following"
          followersOrFollowing={followedUsers}
        >
          <div className={user.followings === 0 ? '' : 'cursor-pointer'}>
            <Stat
              label="Following"
              value={user.followings}
              isLoading={isFollowersLoading}
            />
          </div>
        </FollowersAndFollowingModal>
        <PointsStat
          label="Points"
          value={scoreboard?.data.points ?? 0}
          season={currentSeason}
          isLoading={isScoreboardLoading || isSeasonLoading}
        />
        {user.referralCreditsBalance && user.referralCreditsBalance > 0 && (
          <ReferralCreditsStat
            label="Referral Credits"
            value={user.referralCreditsBalance}
            isLoading={isFollowersLoading || isScoreboardLoading}
          />
        )}
      </div>
    </div>
  )
}

const Stat = ({
  label,
  value,
  isLoading
}: {
  label: string
  value: number
  isLoading?: boolean
}) => {
  if (isLoading) {
    return (
      <div className="min-w-0">
        <div className="h-6 sm:h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto" />
        <p className="text-gray-500 text-sm sm:text-base truncate">{label}</p>
        <div className="h-3 sm:h-5" />
      </div>
    )
  }

  return (
    <div className="min-w-0">
      <p className="text-xl sm:text-2xl font-semibold">{value}</p>
      <p className="text-gray-500 text-sm sm:text-base truncate">{label}</p>
      <div className="h-3 sm:h-5" />
    </div>
  )
}

const ReferralCreditsStat = ({
  label,
  value,
  isLoading
}: {
  label: string
  value: number
  isLoading?: boolean
}) => {
  if (isLoading) {
    return (
      <div className="min-w-0">
        <div className="h-6 sm:h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto" />
        <p className="text-gray-500 text-sm sm:text-base truncate">{label}</p>
        <div className="h-3 sm:h-5" />
      </div>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div className="cursor-help w-fit mx-auto min-w-0">
            <p className="text-xl sm:text-2xl font-semibold truncate">
              R${' '}
              {Number.isInteger(value)
                ? value.toLocaleString('pt-BR')
                : value.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
            </p>
            <p className="text-gray-500 border-b border-dashed border-gray-600 w-fit mx-auto text-sm sm:text-base truncate">
              {label}
            </p>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="font-mono text-left p-4 shadow-xl max-w-xs bg-background border border-border/50"
        >
          <h3 className="text-foreground font-semibold mb-1 flex items-center gap-2">
            Referral Credits{' '}
            <Icons.users className="w-[14px] h-[14px]" strokeWidth={2.5} />
          </h3>
          <div className="space-y-2 pt-2">
            <p className="text-gray-600 dark:text-gray-400">
              Credits acquired by referring friends to the mentorship program
            </p>
            <p className="text-xxs text-gray-400 dark:text-gray-600 mt-1 truncate">
              Currency: Brazilian Reais - R$
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const PointsStat = ({
  label,
  value,
  season,
  isLoading
}: {
  label: string
  value: number
  season: CurrentSeasonResponse | undefined
  isLoading?: boolean
}) => {
  if (isLoading) {
    return (
      <div className="cursor-help w-fit mx-auto min-w-0">
        <div className="h-6 sm:h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto" />
        <div className="h-3 sm:h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto mt-2" />
        <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto mt-2" />
      </div>
    )
  }

  if (!season) {
    return (
      <div className="min-w-0">
        <p className="text-xl sm:text-2xl font-semibold">
          {Number.isInteger(value) ? value : Math.floor(value * 10) / 10}
        </p>
        <p className="text-gray-500 text-sm sm:text-base truncate">{label}</p>
        <div className="h-3 sm:h-5" />
      </div>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div className="cursor-help w-fit mx-auto min-w-0">
            <p className="text-xl sm:text-2xl font-semibold">
              {Number.isInteger(value) ? value : Math.floor(value * 10) / 10}
            </p>
            <p className="text-gray-500 border-b border-dashed border-gray-600 w-fit mx-auto text-sm sm:text-base truncate">
              {label}
            </p>
            <p className="text-xs text-gray-600 mt-1 truncate">{season.name}</p>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="font-mono text-left p-4 shadow-xl max-w-xs bg-background border border-border/50"
        >
          <h3 className="text-foreground font-semibold mb-1 flex items-center gap-2">
            Current Season{' '}
            <Icons.award className="w-[14px] h-[14px]" strokeWidth={2.5} />
          </h3>
          <div className="space-y-2 pt-2">
            <div className="grid grid-cols-[0.5fr_1fr] gap-x-2 items-center">
              <span className="text-gray-400">Season</span>
              <span className="text-foreground">{season.name}</span>
            </div>
            <div className="grid grid-cols-[0.5fr_1fr] gap-x-2 items-center">
              <span className="text-gray-400">Starts</span>
              <span className="text-foreground">
                {format(new Date(season.initDate), 'MMM dd, yyyy')}
              </span>
            </div>
            <div className="grid grid-cols-[0.5fr_1fr] gap-x-2 items-center">
              <span className="text-gray-400">Ends</span>
              <span className="text-foreground">
                {format(new Date(season.endDate), 'MMM dd, yyyy')}
              </span>
            </div>
            {season.metadata?.description && (
              <div className="grid grid-cols-[0.5fr_1fr] gap-x-2 items-start">
                <span className="text-gray-400">Description</span>
                <span className="text-foreground whitespace-pre-wrap truncate line-clamp-2">
                  {season.metadata.description}
                </span>
              </div>
            )}
            {season.metadata?.awards && season.metadata.awards.length > 0 && (
              <div className="pt-2 mt-2 border-t border-border/50">
                <h3 className="text-foreground font-semibold mb-1">Awards</h3>
                <ul className="space-y-1">
                  {season.metadata.awards.slice(0, 3).map(award => (
                    <li
                      key={award.position}
                      className="grid grid-cols-[0.5fr_1fr] gap-x-2"
                    >
                      <span className="text-gray-400">{award.position}</span>
                      <span className="text-foreground truncate line-clamp-1">
                        {award.description}
                      </span>
                    </li>
                  ))}
                  {season.metadata.awards.length > 3 && (
                    <li className="text-gray-400 pt-1">
                      +{season.metadata.awards.length - 3} more
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Header
