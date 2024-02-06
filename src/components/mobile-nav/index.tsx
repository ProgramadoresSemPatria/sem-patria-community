import Link from 'next/link'
import * as React from 'react'

import appLogo from '@/assets/logo.svg'
import { useLockBody } from '@/hooks/use-lock-body'
import { appConfig, appRoutes } from '@/lib/constants'
import { type RouteProps } from '@/lib/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import ClerkUserButton from '../clerk-user-button'
import { LogoutButton } from '../top-bar/logout-button'
import { useAppStore } from '@/hooks/use-app-store'

type MobileNavProps = {
  children?: React.ReactNode
  isAdminPage: boolean
}

const MobileNav = ({ children, isAdminPage }: MobileNavProps) => {
  useLockBody()
  const { isCmsMode } = useAppStore()

  const items: RouteProps[] = [
    {
      href: appRoutes.dashboard,
      label: 'Dashboard'
    },
    {
      href: `${appRoutes.courses}?filter=all`,
      label: 'Courses'
    },
    {
      href: `${appRoutes.codeUp}`,
      label: 'Code Up'
    },
    {
      href: `${appRoutes.mentorship}`,
      label: 'Mentorship'
    },
    {
      href: appRoutes.settings,
      label: 'Settings'
    }
  ]

  const adminRoutes: RouteProps[] = [
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
        'fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 ',
        isAdminPage ? 'lg:hidden' : 'md:hidden'
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={appLogo} alt="Logo" height={40} width={40} />
          <span className="font-bold">{appConfig.name}</span>
        </Link>
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
