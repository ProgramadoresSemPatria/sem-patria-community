'use client'
import NoteEditor from '@/components/editor/editor'
import { useNoteStore } from '@/hooks/note/use-note-store'
import { type Note } from '@prisma/client'
import { useRef, useState, type ElementRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

type NoteContentProps = {
  note: Note
}

export const NoteContent = ({ note }: NoteContentProps) => {
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
          data-testid="title"
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
        >
          {title ?? note.title}
        </div>
      )}
      <NoteEditor
        initialValue={JSON.parse(note.content ?? '{}')}
        onChange={onChangeContent}
      />
    </div>
  )
}
