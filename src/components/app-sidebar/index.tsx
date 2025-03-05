'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { appRoutes, menuItems } from '@/lib/constants'
import { type MenuItemProps } from '@/lib/types'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import MainLogo from '../main-logo'
import UserButton from '../user-button'
import { SkeletonMainNav } from './components/skeleton-main-nav'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Icons } from '../icons'
import { useClerk } from '@clerk/nextjs'

export type AppSidebarProps = {
  mentorship?: boolean
  userName: string
}

export function AppSidebar({ mentorship, userName }: AppSidebarProps) {
  const router = useRouter()
  const { signOut } = useClerk()
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
                      className="hover:bg-muted transition-colors hover:text-secondary"
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
                        className="hover:bg-muted transition-colors hover:text-secondary"
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
        <SidebarFooter className="h-[54px] p-0 gap-0">
          <SidebarMenu className="h-[54px]">
            <SidebarMenuItem className="h-[54px]">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="h-full">
                    <UserButton />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <Link className="w-full h-full" href={`/profile`}>
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link className="w-full h-full" href={`/user/${userName}`}>
                      Public profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="gap-x-2 items-center cursor-pointer"
                    onClick={async () => {
                      await signOut(() => {
                        router.push(appRoutes.signIn)
                      })
                    }}
                  >
                    <Icons.signOut className="w-4 h-4" />
                    Sign out
                    {/* <LogoutButton /> */}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
