'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { appRoutes } from '@/lib/constants'
import { Icons } from '@/components/icons'
import type { SearchedUserProps } from '@/actions/leaderboard/types'
import { cn } from '@/lib/utils'
import { formatPoints } from '@/components/leaderboard/utils'

interface LeaderboardWidgetProps {
  topUsers: SearchedUserProps[]
}

const LeaderboardWidget = ({ topUsers }: LeaderboardWidgetProps) => {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Leaderboard</h2>
          <Link href={appRoutes.leaderboard}>
            <Button
              variant="link"
              className="flex items-center gap-x-2 text-secondary p-0"
            >
              See more <Icons.redirect className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="space-y-1">
          {topUsers.length > 0 ? (
            topUsers.map((user, index) => (
              <Link
                key={user.userId}
                href={`/user/${user.user.username}`}
                className={cn(
                  'flex items-center justify-between p-2 rounded-md transition-colors duration-150 ease-in-out',
                  'hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium w-5 text-center">
                    {index + 1}.
                  </span>
                  <Avatar className="h-8 w-8 ring-2 ring-gray-500/10">
                    <AvatarImage
                      src={user.user.imageUrl || ''}
                      alt={user.user.name}
                    />
                    <AvatarFallback>{user.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium truncate">
                    {user.user.name}
                  </span>
                </div>
                <span className="text-sm font-mono font-bold">
                  {formatPoints(user.points)}
                  <span className="text-[10px] sm:text-xs ml-1 opacity-70 font-normal">
                    pts
                  </span>
                </span>
              </Link>
            ))
          ) : (
            <div className="text-center text-sm text-gray-500 py-4">
              No users to display yet.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default LeaderboardWidget
