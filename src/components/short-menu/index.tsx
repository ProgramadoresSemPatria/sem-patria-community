import { Icons } from '@/components/icons'
import Link from 'next/link'
import { useShortMenu } from './use-short-menu'

export const ShortMenu = () => {
  const {
    showShortMenu,
    handleShowShortMenu,
    filteredMenuItems: menuItems
  } = useShortMenu()
  return (
    <button
      className="flex items-center space-x-2"
      onClick={() => {
        handleShowShortMenu()
      }}
    >
      <div className="flex items-center p-2 justify-center bg-gray-900 rounded hover:bg-muted transition mr-4">
        {showShortMenu ? (
          <Icons.close className="h-5 w-5" />
        ) : (
          <Icons.menu className="h-5 w-5" />
        )}
      </div>
      {showShortMenu && (
        <nav className="fixed inset-0 left-2 top-[72px] z-50 h-min max-h-[280px] w-[280px] overflow-hidden bg-popover rounded-[10px] animate-slide-up-and-fade shadow-base slide-in-from-bottom-80">
          <div className="flex flex-col">
            {menuItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center w-full gap-4 py-4 px-6 transition-all hover:bg-gray-800 text-sm text-gray-300"
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
