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

export const useSettingsStore = create<ISettingsStore>()(
  persist(
    set =>
      ({
        theme: 'system',
        isDraggable: false,
        enableZooming: true,
        panOnDrag: true,

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
      }) as ISettingsStore,
    {
      name: 'settings-store'
    }
  )
)
