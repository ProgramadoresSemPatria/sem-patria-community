import { create } from 'zustand'

type State = {
  content?: string
  title?: string
}

type Actions = {
  onChangeContent: (content: string) => void
  onChangeTitle: (title: string) => void
  initializeNote: (title: string, content?: string) => void
}

export const useNoteStore = create<State & Actions>(set => ({
  content: undefined,
  title: undefined,
  onChangeContent: content => {
    set({ content })
  },
  onChangeTitle: title => {
    set({ title })
  },
  initializeNote: (title: string, content?: string) => {
    set({ title, content })
  }
}))
