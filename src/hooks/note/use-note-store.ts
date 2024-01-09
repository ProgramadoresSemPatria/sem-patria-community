import { create } from 'zustand'

type State = {
  content?: string
  title?: string
}

type Actions = {
  onChangeContent: (content: string) => void
  onChangeTitle: (title: string) => void
}

export const useNoteStore = create<State & Actions>(set => ({
  editorContent: undefined,
  title: undefined,
  onChangeContent: content => {
    set({ content })
  },
  onChangeTitle: title => {
    set({ title })
  }
}))
