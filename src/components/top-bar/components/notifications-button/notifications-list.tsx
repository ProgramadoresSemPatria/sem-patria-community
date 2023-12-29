import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import React from 'react'
import NotificationsListContent from './notifications-list-content'

interface NotificationsListProps {
  children: React.ReactNode
}

const NotificationsList: React.FC<NotificationsListProps> = ({
  children
}: NotificationsListProps) => {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <h1 className="font-semibold underline">Pending approval courses:</h1>
      <PopoverContent className="p-0">
        <NotificationsListContent />
      </PopoverContent>
    </Popover>
  )
}

export default NotificationsList
