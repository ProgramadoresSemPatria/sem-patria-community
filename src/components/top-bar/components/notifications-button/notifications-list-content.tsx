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
import { useMutationState } from '@tanstack/react-query'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import DetailsModal from './details-modal/details-modal'
import DetailsModalContent from './details-modal/details-modal-content'

const NotificationsListContent: React.FC = () => {
  const { data, isLoading, refetch } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const requestStatus = useMutationState({
    filters: {
      mutationKey: ['approveCourse']
    },
    select: mutation => mutation.state.status
  })

  useEffect(() => {
    if (requestStatus[0] === 'success') {
      setTimeout(() => {
        setIsOpen(false)
        refetch()
      }, 500)
    }
  }, [refetch, requestStatus])

  if (isLoading) {
    return (
      <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-lg">Pending approval courses</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Skeleton className="w-full h-[20px] rounded-full" />
          <Skeleton className="w-full h-[20px] rounded-full" />
          <Skeleton className="w-full h-[20px] rounded-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <DetailsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        courseName={selectedCourse?.name ?? ''}
      >
        <DetailsModalContent course={selectedCourse} />
      </DetailsModal>
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
              onClick={() => {
                setSelectedCourse(notification)
                setIsOpen(true)
              }}
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
    </>
  )
}

export default NotificationsListContent
