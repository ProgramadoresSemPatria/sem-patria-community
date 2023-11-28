'use client'

import { usePermissionModal } from '@/hooks/use-modal'
import { useEffect } from 'react'

export const SetupPageContent = () => {
  const { onOpen, isOpen } = usePermissionModal()

  useEffect(() => {
    if (!isOpen) onOpen()
  }, [isOpen, onOpen])

  return null
}
