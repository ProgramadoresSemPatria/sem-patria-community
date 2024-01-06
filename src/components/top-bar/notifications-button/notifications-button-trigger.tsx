'use client'

import { Icons } from '@/components/icons'
import { useNotifications } from '@/hooks/notifications/use-notifications'
import { useMemo } from 'react'

const NotificationsButtonTrigger = () => {
  const { notifications, isLoadingNotifications } = useNotifications()

  const hasNotifications = useMemo(() => {
    if (!notifications) return false

    return (
      notifications?.courses.length > 0 || notifications?.categories.length > 0
    )
  }, [notifications])

  if (isLoadingNotifications) return <Icons.bell className="h-5 w-5" />

  return (
    <>
      {!hasNotifications && <Icons.bell className="h-5 w-5" />}
      {hasNotifications && <Icons.bellDot className="h-5 w-5" />}
    </>
  )
}

export default NotificationsButtonTrigger
