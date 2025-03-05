'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Icons } from '../icons'
import MainLogo from '../main-logo'
import { EventsButton } from './events-button'
import { FeedbackButton } from './feedback-button'
import { LogoutButton } from './logout-button'
import NotificationsButton from './notifications-button/index'
import { SidebarTrigger } from '../ui/sidebar'
import { useIsMobile } from '@/hooks/use-mobile'
import { useState, useEffect } from 'react'
import SearchDialog from './search-dialog'

const feedbackLink =
  'https://docs.google.com/forms/d/e/1FAIpQLSc_UTMhjo2-HH6XovqWajs5RKj_2LQMCq2kz8itV-NcheU8oA/viewform'

const TopBar = () => {
  const { isMobile } = useIsMobile()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const isMac =
    typeof window !== 'undefined' &&
    window.navigator.userAgent.toLowerCase().includes('mac')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsSearchOpen(prev => !prev)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <div className="flex h-[60px] items-center justify-end border-b border-slate-6 pl-6">
        {isMobile && <SidebarTrigger className="mr-4" />}
        <MainLogo isMobile />
        <div className="flex items-center gap-4">
          <Button
            type="button"
            onClick={() => {
              setIsSearchOpen(true)
            }}
            variant="outline"
            size={isMobile ? 'icon' : 'default'}
            className="flex items-center gap-2"
          >
            <Icons.search className="h-4 w-4" />
            {!isMobile && <span>Search</span>}
            {!isMobile && (
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                {isMac ? <span className="text-xs">⌘</span> : 'Ctrl'}K
              </kbd>
            )}
          </Button>
          <FeedbackButton isMobile={isMobile} />
          <Button size={isMobile ? 'icon' : 'default'} variant="outline">
            <Link
              href={feedbackLink}
              target="_blank"
              className="flex items-center gap-x-2"
            >
              {!isMobile && <span>Give your feedback</span>}
              <Icons.redirect className="w-4 h-4 text-violet-600" />
            </Link>
          </Button>
          <NotificationsButton />
          <EventsButton isMobile={isMobile} />
          <div className="hidden md:flex">
            <LogoutButton />
          </div>
        </div>
      </div>

      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => {
          setIsSearchOpen(false)
        }}
        isMac={isMac}
      />
    </>
  )
}

export default TopBar
