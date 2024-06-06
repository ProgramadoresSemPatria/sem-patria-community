'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { Can } from '@/hooks/use-ability'
import { menuItems } from '@/lib/constants'
import { type MenuItemProps } from '@/lib/types'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { useEffect, useState } from 'react'
import ClerkUserButton from '../clerk-user-button'
import { Icons } from '../icons'
import MainLogo from '../main-logo'
import { Button } from '../ui/button'
import { SkeletonMainNav } from './components/skeleton-main-nav'

type MainNavProps = {
  children?: React.ReactNode
}

const MainNav = ({ children }: MainNavProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isOpenCmsSection, setIsOpenCmsSection] = useState(true)

  const pathname = usePathname()

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
        'hidden md:flex h-screen w-[250px] flex-shrink-0 flex-col justify-between border-r border-slate-6 px-4 pb-6 sticky top-0'
      )}
    >
      <div className="w-full flex items-center justify-center">
        <MainLogo />
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
              <span className="font-medium transition-colors hover:text-primary flex h-8 items-center gap-2 rounded-md px-2 text-sm dark:hover:bg-slate-800 hover:bg-slate-100">
                {route.icon}
                {route.label}
              </span>
            </Link>
          ))}
          {/* <Leaderboard /> */}
          <Can I="get" a="CMS">
            <Collapsible
              open={isOpenCmsSection}
              onOpenChange={setIsOpenCmsSection}
            >
              <div className="mt-6">
                <div className="flex items-center w-full justify-between">
                  <p className="font-medium text-sm text-foreground pb-2">
                    CMS
                  </p>
                  <CollapsibleTrigger>
                    <Button size="icon" variant="ghost">
                      {isOpenCmsSection ? (
                        <Icons.arrowUp className="w-4 h-4" />
                      ) : (
                        <Icons.arrowDown className="w-4 h-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <ul className="flex flex-col gap-2">
                  <CollapsibleContent className="flex flex-col gap-2">
                    {adminRoutes.map(route => (
                      <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                          'h-8 rounded-md',
                          route.active
                            ? 'text-primary'
                            : 'text-muted-foreground'
                        )}
                      >
                        <span className="font-medium transition-colors hover:text-primary flex h-8 items-center gap-2 rounded-md px-2 text-sm hover:dark:bg-slate-800 hover:bg-slate-100">
                          {route.icon}
                          {route.label}
                        </span>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </ul>
              </div>
            </Collapsible>
          </Can>
        </ul>
      </nav>
      <ClerkUserButton />
    </div>
  )
}

export default MainNav
