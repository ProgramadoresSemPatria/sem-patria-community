'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { useEffect, useState } from 'react'

type AlertModalProps = {
  isOpen: boolean
  loading: boolean
  title?: string
  description: string
  onConfirm: () => void
  onClose: () => void
}

export const AlertModal = ({
  isOpen,
  loading,
  title,
  description,
  onClose,
  onConfirm
}: AlertModalProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Modal
      title={title ?? 'Are you sure?'}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button variant="outline" disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" disabled={loading} onClick={onConfirm}>
          {loading && <Icons.loader className="mr-2 h-4 w-4 animate-spin" />}
          Delete
        </Button>
      </div>
    </Modal>
  )
}
