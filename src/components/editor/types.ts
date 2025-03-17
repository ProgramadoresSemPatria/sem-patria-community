import { type LucideIcon } from 'lucide-react'
import { type EditorInstance } from 'novel'
import { type Editor } from '@tiptap/core'

export interface BubbleColorMenuItem {
  name: string
  color: string
}

export interface NodeSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  hasTitleEnabled?: boolean
}

export type SelectorItem = {
  name: string
  icon: LucideIcon
  command: (editor: EditorInstance) => void
  isActive: (editor: EditorInstance) => boolean
}

export interface ToolbarProps {
  editor: Editor | null
  hasTitleEnabled?: boolean
}

export interface LinkSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editor: Editor | null
  isToolbar?: boolean
}

export type UseEditorProps = {
  isSubmitting?: boolean
  variant?: 'note' | 'readonly' | 'videoCommentInput' | 'postInput'
}
