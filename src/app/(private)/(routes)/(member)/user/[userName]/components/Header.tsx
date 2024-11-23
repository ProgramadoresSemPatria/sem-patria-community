'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { type User } from '@prisma/client'
import { type User as ClerkUser } from '@clerk/nextjs/server'
// import { useFollowersAndFollowings } from './useFollowersAndFollowings'

const Header = ({
  user,
  currentUser
}: {
  user: User
  currentUser: ClerkUser
}) => {
  //   const { follow, followers, unfollow, following, unfollowing } =
  //     useFollowersAndFollowings(user.id)
  //   const [isFollowed, setIsFollowed] = React.useState(false)

  //   React.useEffect(() => {
  //     if (!followers) return
  //     const isFollowing = followers?.find(follower => {
  //       return follower.id === currentUser.id
  //     })
  //     setIsFollowed(!!isFollowing)
  //   }, [currentUser.id, followers])

  return (
    <div className="shadow-lg rounded-lg space-y-4">
      <div className="flex items-center gap-8 pb-6 border-b">
        <Avatar className="size-24 shadow-md">
          {user?.imageUrl ? (
            <AvatarImage src={user?.imageUrl} />
          ) : (
            <AvatarFallback>
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1 space-y-3">
          <h1 className="text-3xl font-bold flex items-center gap-x-3">
            {user?.name}
            <Badge className="text-sm py-1 px-3">{user?.role[0]}</Badge>
          </h1>
          <p className="text-gray-500 text-lg">@{user?.username}</p>
          {/* <Button
            disabled={following || unfollowing}
            onClick={async () => {
              if (isFollowed) {
                await unfollow(user.id)
              } else {
                await follow(user.id)
              }
            }}
            variant="outline"
            className="text-sm mt-2 hover:bg-gray-400"
          >
            {isFollowed ? 'Unfollow' : 'Follow'}
          </Button> */}
          <Button>Follow</Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-2">
        <div>
          {/* <p className="text-2xl font-semibold">{followers.length}</p> */}
          <p className="text-2xl font-semibold">0</p>

          <p className="text-gray-500">Followers</p>
        </div>
        <div>
          {/* <p className="text-2xl font-semibold">{user.followings}</p> */}
          <p className="text-2xl font-semibold">0</p>
          <p className="text-gray-500">Following</p>
        </div>
        {/* <div>
          <p className="text-2xl font-semibold">{points}</p>
          <p className="text-gray-500">Points</p>
        </div> */}
      </div>
    </div>
  )
}

export default Header
