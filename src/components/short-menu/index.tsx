'use client'
import { Icons } from '@/components/icons'
import Link from 'next/link'
import { useShortMenu } from './use-short-menu'

type ShortMenuProps = {
  isAdmin: boolean
}

export const ShortMenu = ({ isAdmin }: ShortMenuProps) => {
  const { showShortMenu, handleShowShortMenu, filteredMenuItems, menuItems } =
    useShortMenu()

  return (
    <button
      className="flex items-center space-x-2"
      onClick={() => {
        handleShowShortMenu()
      }}
    >
      <div className="flex items-center p-2 justify-center dark:bg-gray-900 bg-slate-100 rounded hover:bg-muted transition mr-4">
        {showShortMenu ? (
          <Icons.close className="h-5 w-5" />
        ) : (
          <Icons.menu className="h-5 w-5" />
        )}
      </div>
      {showShortMenu && (
        <nav className="fixed inset-0 left-2 top-[72px] z-50 h-min w-[280px] overflow-hidden bg-popover rounded-[10px] animate-slide-up-and-fade shadow-base slide-in-from-bottom-80">
          <div className="flex flex-col">
            {(isAdmin ? menuItems : filteredMenuItems).map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center w-full gap-4 py-4 px-6 transition-all dark:hover:bg-gray-800 hover:bg-slate-100  text-sm dark:text-gray-300 text-black"
              >
                {item.icon && (
                  <div className="overflow-visible">{item.icon}</div>
                )}
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </button>
  )
}
