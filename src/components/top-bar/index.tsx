'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import MobileNav from '@/components/mobile-nav'

type TopBarProps = {
  children?: React.ReactNode
}

const TopBar = ({ children }: TopBarProps) => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)

  return (
    <div className="flex h-[60px] items-center justify-end border-b border-slate-6 px-6">
      <div className="hidden items-center gap-4 md:flex">
        <Button variant="outline" className="gap-x-2 items-center">
          <Icons.bot className="w-4 h-4" />
          Feedback
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
