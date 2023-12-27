'use client'
import {
  Card,
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
    <div className="flex flex-col gap-4 p-2">
      {data?.map((notification: Course) => (
        <Card
          key={notification.id}
          className="flex flex-col gap-2 border border-black rounded-md p-2"
        >
          <CardHeader>
            <CardTitle>{notification.name}</CardTitle>
            <CardDescription className="flex gap-1">
              <span>Request date:</span>
              <span>
                {format(new Date(notification.createdAt), 'dd/MM/yyyy')}
              </span>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

export default NotificationsListContent
