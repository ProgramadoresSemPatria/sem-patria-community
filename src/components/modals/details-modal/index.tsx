'use client'
import { Modal } from '@/components/ui/modal'
import React from 'react'

interface DetailsModalProps {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const DetailsModal = ({ children, isOpen, setIsOpen }: DetailsModalProps) => {
  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <Modal
      title={`Manage the content`}
      description="Approve or decline this content to the community."
      isOpen={isOpen}
      onClose={onClose}
    >
      {children}
    </Modal>
  )
}

export default DetailsModal
