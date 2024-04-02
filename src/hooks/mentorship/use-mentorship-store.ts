import { type Video } from '@prisma/client'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type State = {
  videosWatched: Video[]
}

type Actions = {
  onAddVideosWatched: (videosWatched: Video) => void
  onRemoveVideosWatched: (videosWatched: Video) => void
}

export const useMentorshipStore = create(
  persist<State & Actions>(
    (set, get) => ({
      videosWatched: [],
      onAddVideosWatched: videosWatched => {
        if (get().videosWatched.some(video => video.id === videosWatched.id))
          return

        set({ videosWatched: [...get().videosWatched, videosWatched] })
      },
      onRemoveVideosWatched: videosWatched => {
        set({
          videosWatched: get().videosWatched.filter(
            video => video.id !== videosWatched.id
          )
        })
      }
    }),
    {
      name: 'mentorship-videos-watched',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
