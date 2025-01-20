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
import { useEffect, useState } from 'react'
import MainLogo from '../main-logo'
import UserButton from '../user-button'
import { SkeletonMainNav } from './components/skeleton-main-nav'

export type AppSidebarProps = {
  mentorship?: boolean
}

export function AppSidebar({ mentorship }: AppSidebarProps) {
  const [isMounted, setIsMounted] = useState(false)
  const { setOpenMobile, isMobile, setIsMentorshipPage, shouldShowSidebar } =
    useSidebar()

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
                  >
                    <SidebarMenuButton
                      asChild
                      className="hover:bg-foreground transition-colors hover:text-accent"
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
                    >
                      <SidebarMenuButton
                        asChild
                        className="hover:bg-foreground transition-colors hover:text-accent"
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
        <div className="pl-4 md:pl-0">
          <UserButton />
        </div>
      </Sidebar>
    </>
  )
}
