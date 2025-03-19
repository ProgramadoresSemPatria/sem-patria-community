'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'dark' | 'light' | 'system'

interface ISettingsStore {
  theme: Theme
  isDraggable: boolean
  enableZooming: boolean
  panOnDrag: boolean

  setTheme: (theme: Theme) => void
}

const initialState: Omit<ISettingsStore, 'setTheme'> = {
  theme: 'system',
  isDraggable: false,
  enableZooming: true,
  panOnDrag: true
}

export const useSettingsStore = create<ISettingsStore>()(
  persist(
    set => {
      return {
        ...initialState,
        setTheme: (theme: Theme) => {
          const root = window.document.documentElement
          root.classList.remove('light', 'dark')

          if (theme === 'system') {
            const systemTheme = window.matchMedia(
              '(prefers-color-scheme: dark)'
            ).matches
              ? 'dark'
              : 'light'
            root.classList.add(systemTheme)
          }

          root.classList.add(theme)
          set({ theme })
        }
      }
    },
    {
      name: 'settings-store'
    }
  )
)
