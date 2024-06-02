import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Icons } from '../icons'
import MainLogo from '../main-logo'
import { EventsButton } from './events-button'
import { FeedbackButton } from './feedback-button'
import { LogoutButton } from './logout-button'
import { MobileButton } from './mobile-button'
import NotificationsButton from './notifications-button/index'

const feedbackLink =
  'https://docs.google.com/forms/d/e/1FAIpQLSc_UTMhjo2-HH6XovqWajs5RKj_2LQMCq2kz8itV-NcheU8oA/viewform'

const TopBar = () => {
  return (
    <div className="flex h-[60px] items-center justify-end border-b border-slate-6 px-6">
      <MainLogo isMobile />
      <div className="flex items-center gap-3">
        <FeedbackButton />
        <Button variant="outline">
          <Link
            href={feedbackLink}
            target="_blank"
            className="flex items-center gap-x-2"
          >
            <span>Give your feedback</span>
            <Icons.redirect className="h-4 w-4 text-violet-600" />
          </Link>
        </Button>
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
