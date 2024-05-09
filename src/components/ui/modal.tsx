'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import React from 'react'

type ModalProps = {
  title: string
  description: string
  isOpen: boolean
  children: React.ReactNode
  onClose: () => void
  className?: string
}

export const Modal = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  className
}: ModalProps) => {
  const onChange = (open: boolean) => {
    if (!open) onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  )
}
