'use client'

import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { type User } from '@prisma/client'
import { type User as ClerkUser } from '@clerk/nextjs/server'
import { useFollowersAndFollowings } from './useFollowersAndFollowings'

const Header = ({
  user,
  currentUser
}: {
  user: User
  currentUser: ClerkUser
}) => {
  const { follow, followers, unfollow, following, unfollowing } =
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
    } else {
      await follow(user.id)
    }
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
            <Badge className="text-sm py-1 px-3">{user.role[0]}</Badge>
          </h1>
          <p className="text-gray-500 text-lg">@{user.username}</p>
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
        <Stat label="Followers" value={followers.length} />
        <Stat label="Following" value={user.followings} />
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
