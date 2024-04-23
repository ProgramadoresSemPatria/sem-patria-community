import { create } from 'zustand'

type useCreatePostModalStoreProps = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useCreatePostModalStore = create<useCreatePostModalStoreProps>(set => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true })
  },
  onClose: () => {
    set({ isOpen: false })
  }
}))

export default useCreatePostModalStore
