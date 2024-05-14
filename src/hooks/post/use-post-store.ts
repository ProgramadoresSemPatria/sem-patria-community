import { type ExtendedPost } from '@/lib/types'
import { create } from 'zustand'

type State = {
  postList: ExtendedPost[]
}

type Actions = {
  setPostList: (postList: ExtendedPost[]) => void
}

export const usePostStore = create<State & Actions>(set => ({
  postList: [],
  setPostList: postList => {
    set({ postList })
  }
}))
