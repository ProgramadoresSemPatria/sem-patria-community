import { create } from 'zustand'

type useEventModalProps = {
  isOpen: boolean
  onOpen: (date?: string, eventId?: string) => void
  onClose: () => void
  initialDate?: string
  initialEventId?: string
}

export const useEventModal = create<useEventModalProps>(set => ({
  isOpen: false,
  onOpen: (date?: string, eventId?: string) => {
    set({ isOpen: true, initialDate: date, initialEventId: eventId })
  },
  onClose: () => {
    set({ isOpen: false, initialDate: undefined, initialEventId: undefined })
  },
  initialDate: undefined,
  initialEventId: undefined
}))
