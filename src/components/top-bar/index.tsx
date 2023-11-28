'use client'

import { Icons } from '@/components/icons'
import MobileNav from '@/components/mobile-nav'
import { Button } from '@/components/ui/button'
import { appRoutes } from '@/lib/constants'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type TopBarProps = {
  children?: React.ReactNode
}

const TopBar = ({ children }: TopBarProps) => {
  const router = useRouter()
  const { signOut } = useClerk()

  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)

  return (
    <div className="flex h-[60px] items-center justify-end border-b border-slate-6 px-6">
      <div className="hidden items-center gap-4 md:flex">
        <Button variant="outline" className="gap-x-2 items-center">
          <Icons.globe className="w-4 h-4" />
          CMS Mode
        </Button>
        <Button variant="outline" className="gap-x-2 items-center">
          <Icons.bot className="w-4 h-4" />
          Feedback
        </Button>
        <Button
          variant="ghost"
          className="gap-x-2 items-center ml-2"
          onClick={() => signOut(() => router.push(appRoutes.signIn))}
        >
          <Icons.signOut className="w-4 h-4" />
          Sign out
        </Button>
      </div>
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? (
          <Icons.close className="h-5 w-5" />
        ) : (
          <Icons.menu className="h-5 w-5" />
        )}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && <MobileNav>{children}</MobileNav>}
    </div>
  )
}

export default TopBar
