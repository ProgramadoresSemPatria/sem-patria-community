import { Mention } from '@tiptap/extension-mention'
import {
  type SuggestionProps,
  type SuggestionKeyDownProps
} from '@tiptap/suggestion'
import { type Dispatch, type SetStateAction } from 'react'
import { type User } from '@prisma/client'
import { type MentionState } from './editor'

export const MentionExtension = (
  setMentionState: Dispatch<SetStateAction<MentionState>>
) =>
  Mention.configure({
    HTMLAttributes: {
      class: 'mention'
    },
    suggestion: {
      char: '@',
      startOfLine: false,
      items: ({ query }: { query: string }): User[] => {
        setMentionState((prev: MentionState) => {
          return {
            ...prev,
            query,
            active: true
          }
        })
        return []
      },
      render: () => {
        return {
          onStart: (props: SuggestionProps) => {
            setMentionState((prev: MentionState) => ({
              ...prev,
              command: props.command,
              selectedIndex: 0,
              clientRect: props.clientRect
            }))
          },
          onUpdate: (props: SuggestionProps) => {
            setMentionState(prev => ({
              ...prev,
              command: props.command,
              clientRect: props.clientRect
            }))
          },
          onKeyDown: (props: SuggestionKeyDownProps) => {
            const { event } = props

            setMentionState(prev => {
              const items = prev.items as User[]
              const selectedIndex = prev.selectedIndex || 0
              const command = prev.command

              if (event.key === 'ArrowDown') {
                event.preventDefault()
                return {
                  ...prev,
                  selectedIndex: items.length
                    ? (selectedIndex + 1) % items.length
                    : 0
                }
              }

              if (event.key === 'ArrowUp') {
                event.preventDefault()
                return {
                  ...prev,
                  selectedIndex: items.length
                    ? (selectedIndex - 1 + items.length) % items.length
                    : 0
                }
              }

              if (event.key === 'Enter') {
                event.preventDefault()
                if (items[selectedIndex]) {
                  command?.({ label: items[selectedIndex].username })
                }
                return prev
              }

              return prev
            })

            return ['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)
          },
          onExit: () => {
            setMentionState(prev => ({
              ...prev,
              active: false,
              query: '',
              items: [],
              selectedIndex: 0,
              clientRect: null
            }))
          }
        }
      }
    }
  })
