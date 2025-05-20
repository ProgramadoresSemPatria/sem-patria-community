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
import { useSeason } from '@/hooks/season/use-season'
import { format } from 'date-fns'
import type { CurrentSeasonResponse } from '@/actions/leaderboard/types'

const Header = ({
  user,
  currentUser
}: {
  user: User
  currentUser: ClerkUser
}) => {
  const { useGetScoreboardByUserId } = useScoreboard()
  const { follow, followers, unfollow, following, unfollowing, followedUsers } =
    useFollowersAndFollowings(user.id)
  const { useGetCurrentSeason } = useSeason()

  const { data: scoreboard, refetch: refetchScoreboard } =
    useGetScoreboardByUserId(user.id)
  const { data: currentSeason } = useGetCurrentSeason()
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
    <div className="dark:shadow-lg rounded-lg space-y-4">
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
      <div className="grid grid-cols-3 gap-6 text-center">
        <FollowersAndFollowingModal
          title="Followers"
          followersOrFollowing={followers}
        >
          <Stat label="Followers" value={followers.length} />
        </FollowersAndFollowingModal>
        <FollowersAndFollowingModal
          title="Following"
          followersOrFollowing={followedUsers}
        >
          <Stat label="Following" value={user.followings} />
        </FollowersAndFollowingModal>
        <PointsStat
          label="Points"
          value={scoreboard?.data.points ?? 0}
          season={currentSeason}
        />
      </div>
    </div>
  )
}

const Stat = ({ label, value }: { label: string; value: number }) => {
  return (
    <div>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-gray-500">{label}</p>
      <div className="h-5" />
    </div>
  )
}

const PointsStat = ({
  label,
  value,
  season
}: {
  label: string
  value: number
  season: CurrentSeasonResponse | undefined
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div className="cursor-help w-fit mx-auto">
            <p className="text-2xl font-semibold">{value}</p>
            <p className="text-gray-500 border-b border-dashed border-gray-600 w-fit mx-auto">
              {label}
            </p>
            {season && (
              <p className="text-xs text-gray-600 mt-1">{season.name}</p>
            )}
          </div>
        </TooltipTrigger>
        {season && (
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
                    {season.metadata.awards.map(award => (
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
                  </ul>
                </div>
              )}
            </div>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

export default Header
