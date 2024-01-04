'use client'
import { Modal } from '@/components/ui/modal'
import React from 'react'

interface DetailsModalProps {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  courseName: string
}

const DetailsModal = ({
  children,
  isOpen,
  setIsOpen,
  courseName
}: DetailsModalProps) => {
  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <Modal
      title={`Manage "${courseName}"`}
      description="Approve or decline this course to the community."
      isOpen={isOpen}
      onClose={onClose}
    >
      {children}
    </Modal>
  )
}

export default DetailsModal
