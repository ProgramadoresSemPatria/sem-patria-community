'use client'
import { Icons } from '@/components/icons'
import MobileNav from '@/components/mobile-nav'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

type MobileButtonProps = {
  children?: React.ReactNode
}

export const MobileButton = ({ children }: MobileButtonProps) => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
  const pathname = usePathname()
  const isAdminPage = pathname.includes('admin')

  return (
    <>
      <button
        className={cn(
          'flex items-center space-x-2 ',
          isAdminPage ? 'lg:hidden' : 'md:hidden'
        )}
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
      {showMobileMenu && (
        <MobileNav isAdminPage={isAdminPage}>{children}</MobileNav>
      )}
    </>
  )
}
