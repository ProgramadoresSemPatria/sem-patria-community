import { create } from 'zustand'

type useEventModalProps = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useEventModal = create<useEventModalProps>(set => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true })
  },
  onClose: () => {
    set({ isOpen: false })
  }
}))
