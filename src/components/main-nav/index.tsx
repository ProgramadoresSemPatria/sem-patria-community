'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'

import appLogo from '@/assets/logo.svg'
import { Icons } from '@/components/icons'
import { RouteProps } from '@/lib/types'
import { cn } from '@/lib/utils'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { appRoutes } from '@/lib/constants'

type MainNavProps = {
  children?: React.ReactNode
}

const MainNav = ({ children }: MainNavProps) => {
  const { user } = useUser()
  const pathname = usePathname()

  const routes: RouteProps[] = [
    {
      href: appRoutes.dashboard,
      label: 'Dashboard',
      active: pathname === appRoutes.dashboard,
      icon: <Icons.home className="h-4 w-4" />
    },
    {
      href: appRoutes.resources,
      label: 'Resources',
      active: pathname === appRoutes.resources,
      icon: <Icons.resources className="h-4 w-4" />
    },
    {
      href: appRoutes.settings,
      label: 'Settings',
      active: pathname === appRoutes.settings,
      icon: <Icons.settings className="h-4 w-4" />
    }
  ]

  return (
    <div className="hidden h-screen w-[250px] flex-shrink-0 flex-col justify-between border-r border-slate-6 px-4 pb-6 md:flex">
      <div className="flex h-[60px] items-center">
        <Link
          href={appRoutes.dashboard}
          className="hidden items-center space-x-2 md:flex mr-4"
        >
          <Image src={appLogo} alt="Logo" height={40} width={40} />
          <span className="hidden text-sm font-bold sm:inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-400">
            Sem Pátria
          </span>
          <span className='font-light tracking-widest text-muted-foreground opacity-75'>COMM</span>
        </Link>
      </div>
      <nav className="mt-6 flex-1">
        <ul className="flex flex-col gap-2">
          {routes.map(route => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'h-8 rounded-md ',
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
      </nav>
      <div className="flex items-center gap-x-2">
        <UserButton afterSignOutUrl={appRoutes.signIn} />
        <span className="truncate font-bold text-muted-foreground text-sm">
          {user?.fullName || ''}
        </span>
      </div>
    </div>
  )
}

export default MainNav
