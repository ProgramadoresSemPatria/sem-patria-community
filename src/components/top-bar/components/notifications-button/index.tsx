import { Icons } from '@/components/icons'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import React from 'react'
import NotificationsButtonTrigger from './notifications-button-trigger'
import NotificationsListContent from './notifications-list-content'

const NotificationsButton: React.FC = () => {
  return (
    <Popover>
      <PopoverTrigger className="hover:bg-accent p-2 rounded-md">
        <NotificationsButtonTrigger>
          <Icons.notifications />
        </NotificationsButtonTrigger>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <NotificationsListContent />
      </PopoverContent>
    </Popover>
  )
}

export default NotificationsButton
