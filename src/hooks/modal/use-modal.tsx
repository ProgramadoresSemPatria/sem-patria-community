import { create } from 'zustand'

type usePermissionModalProps = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const usePermissionModal = create<usePermissionModalProps>(set => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true })
  },
  onClose: () => {
    set({ isOpen: false })
  }
}))
