'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import appLogo from '@/assets/logo.svg'
import { Icons } from '@/components/icons'
import { useAppStore } from '@/hooks/use-app-store'
import { appRoutes } from '@/lib/constants'
import { type RouteProps } from '@/lib/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { SkeletonMainNav } from './components/skeleton-main-nav'
import ClerkUserButton from '../clerk-user-button'

type MainNavProps = {
  children?: React.ReactNode
}

const MainNav = ({ children }: MainNavProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const { isCmsMode } = useAppStore()
  const isAdminPage = pathname.includes('admin')

  const memberRoutes: RouteProps[] = [
    {
      href: appRoutes.dashboard,
      label: 'Dashboard',
      active: pathname.includes(appRoutes.dashboard),
      icon: <Icons.dashboard className="h-4 w-4" />
    },
    {
      href: `${appRoutes.courses}?filter=all`,
      label: 'Courses',
      active: pathname === appRoutes.courses,
      icon: <Icons.code className="h-4 w-4" />
    },
    {
      href: `${appRoutes.codeUp}`,
      label: 'Code Up',
      active: pathname === appRoutes.codeUp,
      icon: <Icons.calendar className="h-4 w-4" />
    },
    {
      href: `${appRoutes.mentorship}`,
      label: 'Mentorship',
      active: pathname === appRoutes.mentorship,
      icon: <Icons.mentorship className="h-4 w-4" />
    },
    {
      href: appRoutes.settings,
      label: 'Settings',
      active: pathname.includes(appRoutes.settings),
      icon: <Icons.settings className="h-4 w-4" />
    }
  ]

  const adminRoutes: RouteProps[] = [
    {
      href: appRoutes.admin_courses,
      label: 'Courses',
      active: pathname.includes(appRoutes.admin_courses),
      icon: <Icons.alignVertSA className="h-4 w-4" />
    },
    {
      href: appRoutes.admin_categories,
      label: 'Categories',
      active: pathname.includes(appRoutes.admin_categories),
      icon: <Icons.layers className="h-4 w-4" />
    },
    {
      href: appRoutes.admin_events,
      label: 'Events',
      active: pathname.includes(appRoutes.admin_events),
      icon: <Icons.calendarDays className="h-4 w-4" />
    }
  ]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <SkeletonMainNav />

  return (
    <div
      className={cn(
        'hidden  h-screen w-[250px] flex-shrink-0 flex-col justify-between border-r border-slate-6 px-4 pb-6 ',
        isAdminPage ? 'lg:flex' : 'md:flex'
      )}
    >
      <div className="flex h-[60px] items-center">
        <Link
          href={appRoutes.dashboard}
          className="hidden items-center space-x-2 md:flex mr-4"
        >
          <Image src={appLogo} alt="Logo" height={40} width={40} />
          <span className="hidden text-sm font-bold sm:inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-400">
            Sem Pátria
          </span>
          <span className="font-light tracking-widest text-muted-foreground opacity-75">
            COMM
          </span>
        </Link>
      </div>
      <nav className="mt-6 flex-1">
        <ul className="flex flex-col gap-2">
          {memberRoutes.map(route => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'h-8 rounded-md',
                route.active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <span className="font-medium transition-colors hover:text-primary flex h-8 items-center gap-2 rounded-md px-2 text-sm hover:dark:bg-slate-800 hover:bg-slate-100">
                {route.icon}
                {route.label}
              </span>
            </Link>
          ))}
          {isCmsMode && (
            <div className="mt-6">
              <p className="font-medium text-sm text-foreground pb-2">CMS</p>
              <ul className="flex flex-col gap-2">
                {adminRoutes.map(route => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      'h-8 rounded-md',
                      route.active ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    <span className="font-medium transition-colors hover:text-primary flex h-8 items-center gap-2 rounded-md px-2 text-sm hover:dark:bg-slate-800 hover:bg-slate-100">
                      {route.icon}
                      {route.label}
                    </span>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </ul>
      </nav>
      <ClerkUserButton />
    </div>
  )
}

export default MainNav
