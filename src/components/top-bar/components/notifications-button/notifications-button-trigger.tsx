'use client'

import { useNotifications } from '@/hooks/use-notifications'
import React, { useMemo } from 'react'
interface NotificationsButtonTriggerProps {
  children: React.ReactNode
}

const NotificationsButtonTrigger: React.FC<NotificationsButtonTriggerProps> = ({
  children
}: NotificationsButtonTriggerProps) => {
  const { data } = useNotifications()
  const hasNotifications = useMemo(() => {
    return data?.length > 0
  }, [data])

  return (
    <div className="relative">
      {children}
      {hasNotifications && (
        <div className="absolute top-[1px] right-[1px] w-[9px] h-[9px] bg-red-600 rounded-full border" />
      )}
    </div>
  )
}

export default NotificationsButtonTrigger
