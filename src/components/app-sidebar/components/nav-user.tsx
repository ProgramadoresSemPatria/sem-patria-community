'use client'

import { Icons } from '@/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from '@/components/ui/sidebar'
import { appRoutes } from '@/lib/constants'
import { useClerk, useUser } from '@clerk/nextjs'
import { ChevronsUpDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type SidebarFooterProps = {
  userName: string
}

export function NavUser({ userName }: SidebarFooterProps) {
  const router = useRouter()
  const { signOut } = useClerk()
  const { isMobile } = useSidebar()
  const { user } = useUser()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="h-full flex items-center transition-all duration-200 hover:bg-muted/50 active:scale-[0.98]"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user?.imageUrl || ''}
                  alt={user?.fullName || user?.username || ''}
                />

                <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                  {user?.fullName
                    ?.split(' ')
                    .map(n => n[0])
                    .join('') ||
                    user?.username?.[0] ||
                    'U'}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 gap-y-0.5 text-left text-sm leading-tight ml-1">
                <span className="truncate font-semibold">
                  {user?.fullName || user?.username}
                </span>

                <span className="truncate text-xs opacity-70">
                  {user?.emailAddresses[0]?.emailAddress || ''}
                </span>
              </div>

              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg border shadow-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={10}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.imageUrl || ''}
                    alt={user?.fullName || user?.username || ''}
                  />

                  <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                    {user?.fullName
                      ?.split(' ')
                      .map(n => n[0])
                      .join('') ||
                      user?.username?.[0] ||
                      'U'}
                  </AvatarFallback>
                </Avatar>

                <div className="grid flex-1 gap-y-0.5 text-left text-sm leading-tight ml-1">
                  <span className="truncate font-semibold">
                    {user?.fullName || user?.username}
                  </span>

                  <span className="truncate text-xs opacity-70">
                    {user?.emailAddresses[0]?.emailAddress || ''}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-x-2 items-center cursor-pointer hover:bg-muted/80 active:bg-muted transition-all duration-200">
                <Icons.user className="w-4 h-4" />

                <Link className="w-full h-full" href={`/user/${userName}`}>
                  My profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="gap-x-2 items-center cursor-pointer hover:bg-muted/80 active:bg-muted transition-all duration-200">
                <Icons.settings className="w-4 h-4" />

                <Link className="w-full h-full" href={appRoutes.settings}>
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="gap-x-2 items-center cursor-pointer text-red-600 hover:text-red-600 hover:bg-red-50/80 active:bg-red-50 dark:hover:bg-red-950/40 transition-all duration-200"
              onClick={async () => {
                await signOut(() => {
                  router.push(appRoutes.signIn)
                })
              }}
            >
              <Icons.signOut className="w-4 h-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
