'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Icons } from '../icons'
import MainLogo from '../main-logo'
import { EventsButton } from './events-button'
import { FeedbackButton } from './feedback-button'
import { LogoutButton } from './logout-button'
import { MobileButton } from './mobile-button'
import NotificationsButton from './notifications-button/index'
import { useMediaQuery } from '@mantine/hooks'

const feedbackLink =
  'https://docs.google.com/forms/d/e/1FAIpQLSc_UTMhjo2-HH6XovqWajs5RKj_2LQMCq2kz8itV-NcheU8oA/viewform'

const TopBar = () => {
  const isMobile = useMediaQuery('only screen and (max-width: 768px)')

  return (
    <div className="flex h-[60px] items-center justify-end border-b border-slate-6 pl-6">
      <MobileButton />
      <MainLogo isMobile />
      <div className="flex items-center gap-4">
        <FeedbackButton isMobile={isMobile} />
        <Button size={isMobile ? 'icon' : 'default'} variant="outline">
          <Link
            href={feedbackLink}
            target="_blank"
            className="flex items-center gap-x-2"
          >
            {!isMobile && <span>Give your feedback</span>}
            <Icons.redirect className="h-5 w-5 text-violet-600" />
          </Link>
        </Button>
        <NotificationsButton />
        <EventsButton isMobile={isMobile} />
        <div className="hidden md:flex">
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}

export default TopBar
