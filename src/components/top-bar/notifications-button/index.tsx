'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Can } from '@/hooks/use-ability'
import NotificationsButtonTrigger from './notifications-button-trigger'
import NotificationsListContent from './notifications-list-content'

const NotificationsButton = () => {
  return (
    <Can I="get" an="CMS">
      <Popover>
        <PopoverTrigger className="hover:bg-accent rounded-md">
          <NotificationsButtonTrigger />
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <NotificationsListContent />
        </PopoverContent>
      </Popover>
    </Can>
  )
}

export default NotificationsButton
