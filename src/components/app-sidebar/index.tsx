'use client'

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
import { type MenuItemProps } from '@/lib/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { useEffect, useState } from 'react'
import MainLogo from '../main-logo'
import UserButton from '../user-button'
import { SkeletonMainNav } from './components/skeleton-main-nav'

export type AppSidebarProps = {
  mentorship?: boolean
}

export function AppSidebar({ mentorship }: AppSidebarProps) {
  const [isMounted, setIsMounted] = useState(false)
  const { setOpenMobile, isMobile, setIsMobile } = useSidebar()

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
    if (mentorship) {
      setIsMobile(true)
    }
  }, [mentorship, setIsMobile])

  if (!isMounted) return <SkeletonMainNav />
  return (
    <>
      <Sidebar className="px-4">
        <SidebarHeader>
          <MainLogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {memberRoutes.map(item => (
                  <SidebarMenuItem
                    key={item.label}
                    onClick={() => {
                      if (isMobile) setOpenMobile(false)
                    }}
                  >
                    <SidebarMenuButton asChild>
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
                <SidebarMenu>
                  <SidebarGroupLabel className="text-base">
                    CMS
                  </SidebarGroupLabel>
                  {adminRoutes.map(item => (
                    <SidebarMenuItem
                      onClick={() => {
                        if (isMobile) setOpenMobile(false)
                      }}
                      key={item.label}
                    >
                      <SidebarMenuButton asChild>
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
        <UserButton />
      </Sidebar>
    </>
  )
}
