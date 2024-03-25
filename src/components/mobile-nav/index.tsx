import Link from 'next/link'
import * as React from 'react'

import { useAppStore } from '@/hooks/use-app-store'
import { useLockBody } from '@/hooks/use-lock-body'
import { appRoutes } from '@/lib/constants'
import { type MenuItemProps } from '@/lib/types'
import { cn } from '@/lib/utils'
import ClerkUserButton from '../clerk-user-button'
import MainLogo from '../main-logo'
import { LogoutButton } from '../top-bar/logout-button'

type MobileNavProps = {
  children?: React.ReactNode
  isAdminPage: boolean
}

const MobileNav = ({ children, isAdminPage }: MobileNavProps) => {
  useLockBody()
  const { isCmsMode } = useAppStore()

  const items: MenuItemProps[] = [
    {
      href: appRoutes.dashboard,
      label: 'Dashboard'
    },
    {
      href: appRoutes.mentorship,
      label: 'Mentorship'
    },
    {
      href: `${appRoutes.courses}?category=all`,
      label: 'Courses'
    },
    {
      href: `${appRoutes.codeUp}`,
      label: 'Code Up'
    },
    {
      href: appRoutes.settings,
      label: 'Settings'
    }
  ]

  const adminRoutes: MenuItemProps[] = [
    {
      href: appRoutes.admin_courses,
      label: 'Courses'
    },
    {
      href: appRoutes.admin_categories,
      label: 'Categories'
    },
    {
      href: appRoutes.admin_events,
      label: 'Events'
    }
  ]

  return (
    <div
      className={cn(
        'fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80',
        !isAdminPage && 'md:hidden',
        isAdminPage && 'xl:hidden'
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <MainLogo />
        <div className="grid grid-cols-2 w-full">
          <div>
            <span className="font-semibold pb-1">Member</span>
            <nav className="grid grid-flow-row auto-rows-max text-sm text-muted-foreground font-medium">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.disabled ? '#' : item.href}
                  className={cn(
                    'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
                    item.disabled && 'cursor-not-allowed opacity-60'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          {isCmsMode && (
            <div>
              <span className="font-semibold pb-1">Admin</span>
              <nav className="grid grid-flow-row auto-rows-max text-sm text-muted-foreground font-medium">
                {adminRoutes.map((item, index) => (
                  <Link
                    key={index}
                    href={item.disabled ? '#' : item.href}
                    className={cn(
                      'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
                      item.disabled && 'cursor-not-allowed opacity-60'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
        {children}
        <div className="flex justify-between">
          <ClerkUserButton />
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}

export default MobileNav
