'use client'
import { Icons } from '@/components/icons'
import MobileNav from '@/components/mobile-nav'
import { useState } from 'react'

type MobileButtonProps = {
  children?: React.ReactNode
}

export const MobileButton = ({ children }: MobileButtonProps) => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)

  return (
    <>
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => {
          setShowMobileMenu(!showMobileMenu)
        }}
      >
        {showMobileMenu ? (
          <Icons.close className="h-5 w-5" />
        ) : (
          <Icons.menu className="h-5 w-5" />
        )}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && <MobileNav>{children}</MobileNav>}
    </>
  )
}
