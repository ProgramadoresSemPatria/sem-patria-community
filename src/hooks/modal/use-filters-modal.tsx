import { create } from 'zustand'

type useFiltersModalStoreProps = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useFiltersModalStore = create<useFiltersModalStoreProps>(set => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true })
  },
  onClose: () => {
    set({ isOpen: false })
  }
}))

export default useFiltersModalStore
