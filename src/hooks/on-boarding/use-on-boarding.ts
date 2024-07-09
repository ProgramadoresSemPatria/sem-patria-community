import { create } from 'zustand'

type State = {
  isOpen: boolean
  videoWatched: boolean
}

type Actions = {
  onOpen: () => void
  onClose: () => void
  markVideoAsWatched: () => void
  initializeWatchedStatus: () => void
}

export const useOnBoarding = create<State & Actions>(set => ({
  isOpen: false,
  videoWatched: false,
  onOpen: () => {
    set({ isOpen: true })
  },
  onClose: () => {
    set({ isOpen: false })
  },
  markVideoAsWatched: () => {
    localStorage.setItem('videoWatched', 'true')
    set({ videoWatched: true, isOpen: false })
  },
  initializeWatchedStatus: () => {
    const videoWatched = !!localStorage.getItem('videoWatched')
    set({ videoWatched, isOpen: !videoWatched })
  }
}))
