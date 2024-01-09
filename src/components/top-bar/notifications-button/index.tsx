import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import NotificationsButtonTrigger from './notifications-button-trigger'
import NotificationsListContent from './notifications-list-content'

const NotificationsButton = () => {
  return (
    <Popover>
      <PopoverTrigger className="hover:bg-accent p-2 rounded-md">
        <NotificationsButtonTrigger />
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <NotificationsListContent />
      </PopoverContent>
    </Popover>
  )
}

export default NotificationsButton
