import { Icons } from '@/components/icons'
import { useNotification } from '@/hooks/notification/use-notification'
import { memo } from 'react'

const NotificationsButtonTrigger = memo(() => {
  const { notifications, isLoadingNotifications } = useNotification()

  const hasNotifications = Boolean(notifications?.length)

  if (isLoadingNotifications) return <Icons.bell className="h-5 w-5" />

  return hasNotifications ? (
    <Icons.bellDot className="h-5 w-5 animate-bounce" />
  ) : (
    <Icons.bell className="h-5 w-5" />
  )
})

export default NotificationsButtonTrigger
