import { type Editor } from '@tiptap/core'
import { useEffect, useMemo, useState } from 'react'
import { useSuggestionItems } from './slash-command'
import { type UseEditorProps } from './types'

const useEditorState = ({ isSubmitting, variant }: UseEditorProps) => {
  const [openNode, setOpenNode] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [openLink, setOpenLink] = useState(false)
  const [editor, setEditor] = useState<Editor | null>(null)

  const { suggestionItems } = useSuggestionItems()

  useEffect(() => {
    if (isSubmitting) {
      editor?.commands.setContent(null)
    }
  }, [editor?.commands, isSubmitting])

  const hasH1TitleEnabled = variant === 'note'

  const filteredSuggestionItems = useMemo(() => {
    if (hasH1TitleEnabled) {
      return suggestionItems
    }
    return suggestionItems.filter(item => item.title !== 'Heading 1')
  }, [hasH1TitleEnabled, suggestionItems])

  return {
    openNode,
    setOpenNode,
    openColor,
    setOpenColor,
    openLink,
    setOpenLink,
    editor,
    setEditor,
    filteredSuggestionItems,
    hasH1TitleEnabled
  }
}

export { useEditorState }
