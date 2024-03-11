import { menuItems } from '@/lib/constants'
import { useState } from 'react'

export const useShortMenu = () => {
  const [showShortMenu, setShowShortMenu] = useState<boolean>(false)

  const filteredMenuItems = menuItems.filter(
    item => !item.href.includes('admin')
  )

  const handleShowShortMenu = () => {
    setShowShortMenu(prev => !prev)
  }
  return { showShortMenu, handleShowShortMenu, filteredMenuItems }
}
