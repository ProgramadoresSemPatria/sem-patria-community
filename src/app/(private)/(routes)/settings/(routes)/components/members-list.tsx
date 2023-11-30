import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import avatarImg from '@/assets/avatar.png'
import { Badge } from '@/components/ui/badge'
import prismadb from '@/lib/prismadb'
import { validateLevelColor } from '@/lib/utils'
import { Suspense } from 'react'
import { SkeletonMembersList } from './skeleton-members-list'

export const MembersList = async () => {
  const allUsers = await prismadb.user.findMany()

  return (
    <Suspense fallback={<SkeletonMembersList />}>
      <div className="mt-6 w-full max-w-3xl flex flex-col gap-y-6">
        {allUsers.map(user => (
          <div
            key={user.id}
            className="flex items-center justify-between space-x-4"
          >
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={avatarImg.src} />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-sm text-muted-foreground">
                  @{user.username}
                </p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-x-4">
              <Badge
                className={`text-gray-200 ${validateLevelColor(
                  user.level || 'unknown'
                )}  transition-colors ease-in`}
              >
                {user.level
                  ? user.level.charAt(0).toUpperCase() + user.level.slice(1)
                  : 'Unknown'}
              </Badge>
              <Button variant="outline" disabled>
                {user.isAdmin ? 'Admin' : 'Member'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Suspense>
  )
}
