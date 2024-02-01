import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type State = {
  isCmsMode: boolean
  activeNoteReminder: boolean
}

type Actions = {
  setCmsMode: (isCmsMode: boolean) => void
  setActiveNoteReminder: (activeNoteReminder: boolean) => void
}

export const useAppStore = create(
  persist<State & Actions>(
    (set, get) => ({
      isCmsMode: false,
      activeNoteReminder: true,
      setCmsMode: isCmsMode => {
        if (get().isCmsMode !== isCmsMode) {
          set({ isCmsMode })
        }
      },
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
