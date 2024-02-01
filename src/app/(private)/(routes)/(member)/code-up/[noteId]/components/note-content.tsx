'use client'
import { useNoteStore } from '@/hooks/note/use-note-store'
import { type Note } from '@prisma/client'
import dynamic from 'next/dynamic'
import { useMemo, useRef, useState, type ElementRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

type NoteContentProps = {
  note: Note
}

export const NoteContent = ({ note }: NoteContentProps) => {
  const Editor = useMemo(
    () =>
      dynamic(async () => await import('@/components/editor'), { ssr: false }),
    []
  )

  const { title, onChangeContent, onChangeTitle } = useNoteStore()

  const inputRef = useRef<ElementRef<'textarea'>>(null)
  const [isEditingTitle, setIsEditingTitle] = useState(false)

  const enableInput = () => {
    setIsEditingTitle(true)
    setTimeout(() => {
      onChangeTitle(title ?? note.title)
      inputRef.current?.focus()
    }, 0)
  }

  const disableInput = () => {
    setIsEditingTitle(false)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      disableInput()
    }
  }

  return (
    <div className="md:max-w-3xl lg:max-w-4xl mt-6 mx-auto group relative">
      {isEditingTitle ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={title}
          onChange={e => {
            onChangeTitle(e.target.value)
          }}
          className="w-full text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
        >
          {title ?? note.title}
        </div>
      )}
      <Editor
        editable
        onChange={onChangeContent}
        initialContent={note.content ?? undefined}
      />
      <p className="text-sm text-gray-500 mt-2">
        Insert the hashtag{' '}
        <kbd className="rounded-md border bg-muted px-1 text-xs">
          #100DaysOfCommit
        </kbd>{' '}
        in title of the note if it refers to the challenge.
      </p>
    </div>
  )
}
