'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

const Leaderboard = () => {
  const users = [
    {
      name: <Skeleton />,
      points: 100
    },
    {
      name: <Skeleton />,
      points: 70
    },
    {
      name: <Skeleton />,
      points: 50
    }
  ]

  return (
    <Card className="hidden md:flex md:flex-col mt-4 relative p-4">
      <div className="flex items-center justify-between w-full px-2">
        <h1 className="text-primary text-sm font-semibold">Leaderboard</h1>
        <span className="text-sm text-teal-500 font-medium hover:font-bold transition-all">
          Monthly
        </span>
      </div>
      <Separator className="my-2" />
      <CardContent className="px-2 py-0 pb-2 flex flex-col gap-y-3">
        {users.map((_user, index) => (
          <div key={_user.points} className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <div className="h-5 w-5 bg-slate-100 dark:bg-violet-800 rounded-full flex items-center justify-center">
                <span className="text-xs text-primary">{index + 1}</span>
              </div>
              <span className="text-sm text-primary font-medium">
                {_user.name}
              </span>
            </div>
            <span className="text-primary text-sm text-violet-400 dark:text-violet-700 font-bold">
              {_user.points}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default Leaderboard
