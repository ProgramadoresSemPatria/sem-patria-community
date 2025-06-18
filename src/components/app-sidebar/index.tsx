'use client'

import MainLogo from '@/components/main-logo'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { Can } from '@/hooks/use-ability'
import { menuItems } from '@/lib/constants'
import Link from 'next/link'
import { NavUser } from './components/nav-user'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { SkeletonMainNav } from './components/skeleton-main-nav'
import { cn } from '@/lib/utils'

export type AppSidebarProps = {
  mentorship?: boolean
  userName: string
}

export function AppSidebar({ mentorship, userName }: AppSidebarProps) {
  const [isMounted, setIsMounted] = useState(false)
  const { setOpenMobile, isMobile, shouldShowSidebar, setIsMentorshipPage } =
    useSidebar()

  const pathname = usePathname()

  const { memberRoutes, adminRoutes } = useMemo(() => {
    const isRouteActive = (route: string) => {
      const currentPath = pathname.split('?')[0]
      if (route === '/') return currentPath === '/'
      return (
        currentPath === route ||
        currentPath === route.split('?')[0] ||
        currentPath.startsWith(route)
      )
    }

    const memberItems = menuItems
      .filter(item => !item.href.includes('admin'))
      .map(item => ({
        ...item,
        active: isRouteActive(item.href)
      }))

    const adminItems = menuItems
      .filter(item => item.href.includes('admin'))
      .map(item => ({
        ...item,
        active: isRouteActive(item.href)
      }))

    return { memberRoutes: memberItems, adminRoutes: adminItems }
  }, [pathname])

  useEffect(() => {
    setIsMounted(true)
    setIsMentorshipPage(!!mentorship)
  }, [mentorship, setIsMentorshipPage])

  if (!shouldShowSidebar) return null

  if (!isMounted) return <SkeletonMainNav />

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <MainLogo />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {memberRoutes.map(item => (
              <SidebarMenuItem
                key={item.label}
                onClick={() => {
                  if (isMobile) setOpenMobile(false)
                }}
                className={cn(
                  'transition-all duration-200',
                  item.active &&
                    'bg-primary rounded-md hover:bg-primary/80 text-white'
                )}
              >
                <SidebarMenuButton
                  asChild
                  className={cn(
                    'transition-colors relative group',
                    item.active
                      ? ''
                      : 'hover:bg-muted hover:text-primary dark:hover:text-secondary'
                  )}
                  isActive={item.active}
                  aria-current={item.active ? 'page' : undefined}
                >
                  <Link href={item.href}>
                    <span className="text-base flex items-center gap-x-2">
                      {item.icon}
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <Can I="get" a="CMS">
          <SidebarGroup>
            <SidebarGroupLabel>CMS</SidebarGroupLabel>
            <SidebarMenu>
              {adminRoutes.map(item => (
                <SidebarMenuItem
                  onClick={() => {
                    if (isMobile) setOpenMobile(false)
                  }}
                  key={item.label}
                  className={cn(
                    'transition-all duration-200',
                    item.active &&
                      'bg-primary rounded-md hover:bg-primary/80 text-white'
                  )}
                >
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      'transition-colors relative group',
                      item.active
                        ? ''
                        : 'hover:bg-muted hover:text-primary dark:hover:text-secondary'
                    )}
                    isActive={item.active}
                    aria-current={item.active ? 'page' : undefined}
                  >
                    <Link href={item.href}>
                      <span className="text-base flex items-center gap-x-2">
                        {item.icon}
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </Can>
      </SidebarContent>

      <SidebarFooter>
        <NavUser userName={userName} />
      </SidebarFooter>
    </Sidebar>
  )
}
