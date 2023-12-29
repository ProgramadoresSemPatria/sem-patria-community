'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useNotifications } from '@/hooks/use-notifications'
import { type Course } from '@prisma/client'
import { format } from 'date-fns'
import React from 'react'

const NotificationsListContent: React.FC = () => {
  const { data, isLoading } = useNotifications()

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-2">
        <Skeleton className="w-full h-[20px] rounded-full" />
      </div>
    )
  }

  return (
    <Card className="shadow-none border-none">
      <CardHeader>
        <CardTitle className="text-lg">Pending approval courses</CardTitle>
        <CardDescription>{data?.length ?? 0} pending</CardDescription>
      </CardHeader>
      <CardContent className="grid">
        {data?.map((notification: Course) => (
          <div
            key={notification.id}
            className="mb-4 grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0 cursor-pointer hover:bg-zinc-100 dark:hover:bg-slate-900 p-4 rounded-md"
          >
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {notification.name}
              </p>
              <p className="text-sm text-muted-foreground">
                Request date:{' '}
                {format(new Date(notification.createdAt), 'dd/MM/yyyy')}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default NotificationsListContent
