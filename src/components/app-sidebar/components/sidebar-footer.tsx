'use client'

import { Icons } from '@/components/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar'
import { appRoutes } from '@/lib/constants'
import { useClerk } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import UserButton from '../../user-button'

type SidebarFooterProps = {
  userName: string
}

export function SidebarFooterComponent({ userName }: SidebarFooterProps) {
  const router = useRouter()
  const { signOut } = useClerk()

  return (
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
              <DropdownMenuItem className="gap-x-2 items-center cursor-pointer">
                <Icons.settings className="w-4 h-4" />
                <Link className="w-full h-full" href={appRoutes.settings}>
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-x-2 items-center cursor-pointer">
                <Icons.user className="w-4 h-4" />
                <Link className="w-full h-full" href={`/user/${userName}`}>
                  My profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
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
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
