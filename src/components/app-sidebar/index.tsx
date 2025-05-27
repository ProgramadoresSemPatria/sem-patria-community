'use client'

import MainLogo from '@/components/main-logo'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
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
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { SkeletonMainNav } from './components/skeleton-main-nav'
import { cn } from '@/lib/utils'
import { SidebarFooterComponent } from './components/sidebar-footer'

export type AppSidebarProps = {
  mentorship?: boolean
  userName: string
}

export function AppSidebar({ mentorship, userName }: AppSidebarProps) {
  const [isMounted, setIsMounted] = useState(false)
  const { setOpenMobile, isMobile, setIsMentorshipPage, shouldShowSidebar } =
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
    <>
      <Sidebar className="px-4">
        <SidebarHeader className="pl-4 md:pl-0">
          <MainLogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="pl-3 md:pl-0">
                {memberRoutes.map(item => (
                  <SidebarMenuItem
                    key={item.label}
                    onClick={() => {
                      if (isMobile) setOpenMobile(false)
                    }}
                    className={cn(
                      'transition-all duration-200',
                      item.active && 'bg-primary/70 text-white rounded-md'
                    )}
                  >
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        'hover:bg-muted transition-colors hover:text-secondary',
                        item.active && 'font-medium text-primary'
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
            </SidebarGroupContent>
          </SidebarGroup>
          <Can I="get" a="CMS">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="pl-3 md:pl-0 ">
                  <SidebarGroupLabel className="text-base">
                    CMS
                  </SidebarGroupLabel>
                  {adminRoutes.map(item => (
                    <SidebarMenuItem
                      onClick={() => {
                        if (isMobile) setOpenMobile(false)
                      }}
                      key={item.label}
                      className={cn(
                        'transition-all duration-200',
                        item.active && 'bg-primary/70 rounded-md'
                      )}
                    >
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          'hover:bg-muted transition-colors hover:text-secondary',
                          item.active && 'font-medium text-primary'
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
              </SidebarGroupContent>
            </SidebarGroup>
          </Can>
        </SidebarContent>

        <SidebarFooterComponent userName={userName} />
      </Sidebar>
    </>
  )
}
