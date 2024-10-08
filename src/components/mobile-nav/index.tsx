'use client'

import Link from 'next/link'
import * as React from 'react'

import { Can } from '@/hooks/use-ability'
import { useLockBody } from '@/hooks/use-lock-body'
import { appRoutes } from '@/lib/constants'
import { type MenuItemProps } from '@/lib/types'
import { cn } from '@/lib/utils'
import MainLogo from '../main-logo'
import { LogoutButton } from '../top-bar/logout-button'
import UserButton from '../user-button'

type MobileNavProps = {
  children?: React.ReactNode
  isAdminPage: boolean
}

const MobileNav = ({ children, isAdminPage }: MobileNavProps) => {
  useLockBody()

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
      href: appRoutes.codeUp,
      label: 'Code Up'
    },
    {
      href: appRoutes.profile,
      label: 'Profile'
    },
    {
      href: `${appRoutes.forum}?category=All`,
      label: 'Forum'
    }
  ]

  const adminRoutes: MenuItemProps[] = [
    {
      href: appRoutes.admin_users,
      label: 'Users'
    },
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
    },
    {
      href: appRoutes.admin_classroom,
      label: 'Classroom'
    }
  ]

  return (
    <div
      className={cn(
        'fixed inset-0 top-8 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80',
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
          <Can I="get" an="CMS">
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
          </Can>
        </div>
        {children}
        <div className="flex justify-between">
          <UserButton />
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}

export default MobileNav
