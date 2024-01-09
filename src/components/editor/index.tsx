'use client'
import { type BlockNoteEditor, type PartialBlock } from '@blocknote/core'
import '@blocknote/core/style.css'
import {
  BlockNoteView,
  getDefaultReactSlashMenuItems,
  useBlockNote,
  type ReactSlashMenuItem
} from '@blocknote/react'

import { useTheme } from 'next-themes'
import { useMemo } from 'react'

type EditorProps = {
  onChange: (value: string) => void
  initialContent?: string
  editable?: boolean
}

const Editor = ({ onChange, editable, initialContent }: EditorProps) => {
  const { resolvedTheme } = useTheme()

  const slashMenuItems: ReactSlashMenuItem[] = getDefaultReactSlashMenuItems()

  const formattedMenuItems = useMemo(() => {
    return slashMenuItems.filter(item => item.name !== 'Image')
  }, [slashMenuItems])

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as Array<PartialBlock<never, never, never>>)
      : undefined,
    onEditorContentChange: editor => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
    },
    slashMenuItems: formattedMenuItems
  })

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      />
    </div>
  )
}

export default Editor
