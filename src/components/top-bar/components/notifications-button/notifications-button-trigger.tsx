'use client'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useNotifications } from '@/hooks/use-notifications'
import React, { useMemo } from 'react'

const NotificationsButtonTrigger: React.FC = () => {
  const { data } = useNotifications()
  const hasNotifications = useMemo(() => {
    return data?.length > 0
  }, [data])

  return (
    <Button variant="ghost" className="gap-x-2 items-center">
      {hasNotifications ? (
        <div className="relative">
          <Icons.notifications />
          <div className="absolute top-[1px] right-[1px] w-[9px] h-[9px] bg-red-600 rounded-full border" />
        </div>
      ) : (
        <Icons.notifications />
      )}
    </Button>
  )
}

export default NotificationsButtonTrigger
