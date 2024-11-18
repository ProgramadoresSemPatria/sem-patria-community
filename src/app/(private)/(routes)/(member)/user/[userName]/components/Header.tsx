import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { type User } from '@prisma/client'

import React from 'react'

const Header = ({ user }: { user: User }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 shadow-md rounded-lg space-y-10">
      <div className="flex items-center gap-6 pb-6 border-b-2">
        <Avatar className="h-32 w-32">
          {user?.imageUrl ? (
            <AvatarImage src={user?.imageUrl} />
          ) : (
            <AvatarFallback>U</AvatarFallback>
          )}
        </Avatar>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center gap-x-4">
            {user?.name}
            <span className="font-semibold flex items-start justify-start start">
              <Badge>{user?.role[0]}</Badge>
            </span>
          </h1>
          <p className="text-gray-600">@{user?.username}</p>
          <Button variant="outline" className="text-sm mt-2">
            {/* {isFollowing ? 'Unfollow' : 'Follow'} */}
            Unfollow
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Header
