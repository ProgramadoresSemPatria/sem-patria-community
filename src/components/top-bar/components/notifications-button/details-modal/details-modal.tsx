'use client'
import { Modal } from '@/components/ui/modal'
import { type Course } from '@prisma/client'
import React from 'react'

interface DetailsModalProps {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  courseName: string
}

const DetailsModal: React.FC<DetailsModalProps> = ({
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
