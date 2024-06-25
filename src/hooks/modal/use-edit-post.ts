import { create } from 'zustand'

type useEditPostModalStoreProps = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useEditPostModalStore = create<useEditPostModalStoreProps>(set => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true })
  },
  onClose: () => {
    set({ isOpen: false })
  }
}))

export default useEditPostModalStore
