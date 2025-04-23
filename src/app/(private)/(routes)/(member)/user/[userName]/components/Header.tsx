'use client'

import { Icons } from '@/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PositionIconMap, TRAIL_LABELS } from '@/lib/constants'
import { Positions, Roles } from '@/lib/types'
import { getHighestPriorityRole } from '@/lib/utils'
import { type User as ClerkUser } from '@clerk/nextjs/server'
import { type User } from '@prisma/client'
import { useFollowersAndFollowings } from './useFollowersAndFollowings'

import { useEffect, useState } from 'react'

import { FollowersAndFollowingModal } from './FollowersAndFollowingModal'
const Header = ({
  user,
  currentUser
}: {
  user: User
  currentUser: ClerkUser
}) => {
  const { follow, followers, unfollow, following, unfollowing, followedUsers } =
    useFollowersAndFollowings(user.id)
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
      return
    }
    await follow(user.id)
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
              {isFollowed ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-2">
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
      </div>
    </div>
  )
}

const Stat = ({ label, value }: { label: string; value: number }) => (
  <div>
    <p className="text-2xl font-semibold">{value}</p>
    <p className="text-gray-500">{label}</p>
  </div>
)

export default Header
