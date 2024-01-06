'use client'
import DetailsModal from '@/components/modals/details-modal'
import DetailsModalContent from '@/components/modals/details-modal/details-modal-content'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useNotifications } from '@/hooks/notifications/use-notifications'
import { type Category, type Course } from '@prisma/client'
import { formatDistance, subDays } from 'date-fns'
import { useMemo, useState } from 'react'

export type NotificationProps =
  | ({
      type: string
    } & Category)
  | (Course & {
      type: string
    })

const NotificationsListContent = () => {
  const { notifications, isLoadingNotifications } = useNotifications()

  const [isOpen, setIsOpen] = useState(false)
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationProps>()

  // const requestStatus = useMutationState({
  //   filters: {
  //     mutationKey: ['approveCourse']
  //   },
  //   select: mutation => mutation.state.status
  // })
  // const queryClient = useQueryClient()

  // useEffect(() => {
  //   if (requestStatus[0] === 'success') {
  //     setTimeout(() => {
  //       setIsOpen(false)
  //       refetch()
  //       queryClient.refetchQueries({
  //         queryKey: ['courses']
  //       })
  //     }, 500)
  //   }
  // }, [queryClient, refetch, requestStatus])

  const formattedCourses = useMemo(() => {
    if (!notifications) return []
    return notifications?.courses.map(course => ({
      ...course,
      type: 'course'
    }))
  }, [notifications])

  const formattedCategories = useMemo(() => {
    if (!notifications) return []
    return notifications?.categories.map(category => ({
      ...category,
      type: 'category'
    }))
  }, [notifications])

  const allNotifications = useMemo(() => {
    if (!notifications) return []

    return [...formattedCourses, ...formattedCategories]
  }, [formattedCategories, formattedCourses, notifications])

  const onSelectNotification = (id: string, type: string) => {
    if (type === 'course') {
      const selectedCourse = formattedCourses.find(course => course.id === id)
      setSelectedNotification(selectedCourse)
    }

    if (type === 'Category') {
      const selectedCategory = formattedCategories.find(
        category => category.id === id
      )
      setSelectedNotification(selectedCategory)
    }

    setIsOpen(true)
  }

  if (isLoadingNotifications) {
    return (
      <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Skeleton className="w-full h-[20px] rounded-md" />
          <Skeleton className="w-full h-[20px] rounded-md" />
          <Skeleton className="w-full h-[20px] rounded-md" />
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <DetailsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        courseName={selectedNotification?.name ?? ''}
      >
        <DetailsModalContent content={selectedNotification} />
      </DetailsModal>
      <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            {allNotifications.length} Content Pending Approval
          </CardDescription>
        </CardHeader>
        <CardContent className="grid">
          {allNotifications.map(notification => (
            <div
              key={notification.id}
              className="mb-4 grid grid-cols-[25px_1fr_0.5fr] items-start last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.name.charAt(0).toUpperCase() +
                    notification.name.slice(1)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatDistance(
                    subDays(new Date(notification.createdAt), 0),
                    new Date(),
                    { addSuffix: true }
                  )}
                </p>
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  onSelectNotification(notification.id, notification.type)
                }}
              >
                Review
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}

export default NotificationsListContent
