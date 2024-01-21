'use client'
import React, { useEffect, useState } from 'react'
import FeedbackModal from '@/components/modals/feedback-modal'
import { PermissionModal } from '@/components/modals/permission-modal'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <PermissionModal />
      <FeedbackModal />
    </>
  )
}
