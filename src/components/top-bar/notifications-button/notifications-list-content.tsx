'use client'
import { getCategory } from '@/actions/category/get-category'
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
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useNotification } from '@/hooks/notification/use-notification'
import { type Category, type Course } from '@prisma/client'
import { formatDistance, subDays } from 'date-fns'
import { useCallback, useMemo, useState } from 'react'

type NotificationTypes = 'course' | 'category'

export type NotificationProps = {
  type: NotificationTypes
  courseProps: Course
  categoryProps?: Category
}

const NotificationsListContent = () => {
  const { notifications, isLoadingNotifications } = useNotification()

  const [isOpen, setIsOpen] = useState(false)
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationProps>()

  const formattedNotifications = useMemo(() => {
    if (!notifications) return []
    return notifications?.map(course => ({
      ...course,
      type: 'course'
    }))
  }, [notifications])

  const onSelectNotification = async (
    type: NotificationTypes,
    notification: Course
  ) => {
    const category = await getCategory(notification.categoryId)
    const props: NotificationProps = {
      courseProps: notification,
      categoryProps: category ?? undefined,
      type
    }
    setSelectedNotification(props)

    setIsOpen(true)
  }

  const onCloseModal = useCallback(() => {
    setIsOpen(false)
  }, [])

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
      <DetailsModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <DetailsModalContent
          content={selectedNotification}
          onClose={onCloseModal}
        />
      </DetailsModal>
      <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            {formattedNotifications.length} Content Pending Approval
          </CardDescription>
        </CardHeader>
        <CardContent className="max-h-48 flex flex-col gap-y-8">
          <ScrollArea className="overflow-auto">
            {formattedNotifications.map(notification => (
              <div
                key={notification.id}
                className="py-3 grid grid-cols-[25px_1fr_0.5fr] items-start last:mb-0 last:pb-0"
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
                  className="mr-4"
                  size="sm"
                  variant="secondary"
                  onClick={async () => {
                    await onSelectNotification(
                      notification.type as NotificationTypes,
                      notification
                    )
                  }}
                >
                  Review
                </Button>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  )
}

export default NotificationsListContent
