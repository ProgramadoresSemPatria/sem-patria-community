'use client'

import { Icons } from '@/components/icons'
import { useNotification } from '@/hooks/notification/use-notification'
import { useMemo } from 'react'

const NotificationsButtonTrigger = () => {
  const { notifications, isLoadingNotifications } = useNotification()

  const hasNotifications = useMemo(() => {
    if (!notifications) return false

    return notifications.length > 0
  }, [notifications])

  if (isLoadingNotifications) return <Icons.bell className="h-5 w-5" />

  return (
    <>
      {!hasNotifications && <Icons.bell className="h-5 w-5" />}
      {hasNotifications && <Icons.bellDot className="h-5 w-5 animate-bounce" />}
    </>
  )
}

export default NotificationsButtonTrigger
