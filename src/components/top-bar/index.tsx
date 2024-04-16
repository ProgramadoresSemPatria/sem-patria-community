import MainLogo from '../main-logo'
import { EventsButton } from './events-button'
import { FeedbackButton } from './feedback-button'
import { LogoutButton } from './logout-button'
import { MobileButton } from './mobile-button'
import NotificationsButton from './notifications-button/index'

const TopBar = async () => {
  return (
    <div className="flex h-[60px] items-center justify-end border-b border-slate-6 px-6">
      <MainLogo isMobile />
      <div className="flex items-center gap-3">
        <FeedbackButton />
        <NotificationsButton />
        <EventsButton />
        <div className="hidden md:flex">
          <LogoutButton />
        </div>
      </div>
      <MobileButton />
    </div>
  )
}

export default TopBar
