import { Mention } from '@tiptap/extension-mention'
import {
  type SuggestionKeyDownProps
  //   type SuggestionProps
} from '@tiptap/suggestion'
import { type MentionState } from './editor'
import { type Dispatch, type SetStateAction } from 'react'
import { type User } from '@prisma/client'
import { type Editor } from '@tiptap/core'

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
      items: ({ query }: { query: string }) => {
        setMentionState(prev => ({
          ...prev,
          query,
          active: true
        }))
        return []
      },
      render: () => {
        return {
          onStart: (props: {
            editor: Editor
            clientRect: DOMRect
            command: (item: { label: string }) => void
          }) => {
            setMentionState(prev => ({
              ...prev,
              command: props.command,
              active: true,
              selectedIndex: 0,
              clientRect: props.clientRect
            }))
          },
          onUpdate: (props: {
            editor: Editor
            clientRect: DOMRect
            command: (item: { label: string }) => void
          }) => {
            setMentionState(prev => ({
              ...prev,
              command: props.command,
              clientRect: props.clientRect
            }))
          },
          onKeyDown: (
            props: SuggestionKeyDownProps & {
              items: User[]
              selectedIndex: number
              command: (item: { label: string }) => void
            }
          ) => {
            const { event, items, selectedIndex, command } = props
            console.log(items)

            if (event.key === 'ArrowDown') {
              event.preventDefault()
              const nextIndex = (selectedIndex + 1) % items.length
              setMentionState(prev => ({
                ...prev,
                selectedIndex: nextIndex
              }))
              return true
            }

            if (event.key === 'ArrowUp') {
              event.preventDefault()
              const prevIndex =
                (selectedIndex - 1 + items.length) % items.length
              setMentionState(prev => ({
                ...prev,
                selectedIndex: prevIndex
              }))
              return true
            }

            if (event.key === 'Enter') {
              event.preventDefault()
              if (items[selectedIndex]) {
                command({ label: items[selectedIndex].username })
              }
              return true
            }

            return false
          },
          onExit: () => {
            setMentionState(prev => ({
              ...prev,
              active: false,
              query: undefined,
              items: undefined,
              selectedIndex: undefined,
              clientRect: undefined
            }))
          }
        }
      }
    }
  })
