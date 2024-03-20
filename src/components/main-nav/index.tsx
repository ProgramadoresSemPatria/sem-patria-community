'use client'

import { useAppStore } from '@/hooks/use-app-store'
import { menuItems } from '@/lib/constants'
import { type MenuItemProps } from '@/lib/types'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { useEffect, useState } from 'react'
import ClerkUserButton from '../clerk-user-button'
import MainLogo from '../main-logo'
import { SkeletonMainNav } from './components/skeleton-main-nav'

type MainNavProps = {
  children?: React.ReactNode
}

const MainNav = ({ children }: MainNavProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const { isCmsMode } = useAppStore()
  const isAdminPage = pathname.includes('admin')

  const memberRoutes: MenuItemProps[] = menuItems
    .filter(item => !item.href.includes('admin'))
    .map(item => {
      return {
        ...item,
        active: pathname.includes(item.href)
      }
    })

  const adminRoutes: MenuItemProps[] = menuItems
    .filter(item => item.href.includes('admin'))
    .map(item => {
      return {
        ...item,
        active: pathname.includes(item.href)
      }
    })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <SkeletonMainNav />

  return (
    <div
      className={cn(
        'hidden h-screen w-[250px] flex-shrink-0 flex-col justify-between border-r border-slate-6 px-4 pb-6',
        !isAdminPage && 'md:flex',
        isAdminPage && 'xl:flex'
      )}
    >
      <MainLogo />
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
