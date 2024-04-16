import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type State = {
  activeNoteReminder: boolean
}

type Actions = {
  setActiveNoteReminder: (activeNoteReminder: boolean) => void
}

export const useAppStore = create(
  persist<State & Actions>(
    (set, get) => ({
      activeNoteReminder: true,
      setActiveNoteReminder: activeNoteReminder => {
        if (get().activeNoteReminder !== activeNoteReminder) {
          set({ activeNoteReminder })
        }
      }
    }),
    {
      name: 'app-mode',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
