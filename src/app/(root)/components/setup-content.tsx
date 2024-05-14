'use client'

import { usePermissionModal } from '@/hooks/modal/use-modal'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const SetupPageContent = () => {
  const { onOpen, isOpen } = usePermissionModal()
  const { userId } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (userId) router.push('/dashboard')
    else if (!isOpen) onOpen()
  }, [isOpen, onOpen, router, userId])

  return null
}
