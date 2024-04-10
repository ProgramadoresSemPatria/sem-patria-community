import { type Note } from '@prisma/client'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

type NoteEditorProps = {
  onChange: (content: string) => void
  note?: Note
}

export const NoteEditor = ({ onChange, note }: NoteEditorProps) => {
  const Editor = useMemo(
    () =>
      dynamic(async () => await import('@/components/editor'), { ssr: false }),
    []
  )

  return (
    <Editor
      editable
      onChange={onChange}
      initialContent={note?.content ?? undefined}
    />
  )
}
