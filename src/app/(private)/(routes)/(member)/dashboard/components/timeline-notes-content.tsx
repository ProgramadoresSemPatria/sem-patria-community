'use client'
import NoteEditor from '@/components/editor/editor'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import Link from 'next/link'
import { useState } from 'react'
import { format } from 'date-fns'

type TextNode = {
  type: 'text'
  text: string
}

type ParagraphNode = {
  type: 'paragraph'
  content: TextNode[]
}

type ContentNode = ParagraphNode

type Content = {
  content: ContentNode[]
}

type TimelineNotesContentProps = {
  content?: string | null
  noteId: string
  updatedAt?: Date
}

function getFirstParagraphWithText(content: Content): string | null {
  if (!content || !content?.content?.length) return null

  for (const node of content.content) {
    if (node?.type === 'paragraph' && Array.isArray(node?.content)) {
      for (const child of node.content) {
        if (child?.type === 'text' && typeof child?.text === 'string') {
          return child.text
        }
      }
    }
  }
  return null
}

const TimelineNotesContent = ({
  content,
  noteId,
  updatedAt
}: TimelineNotesContentProps) => {
  const [isOpen, setIsOpen] = useState(false)

  let parsedContent: Content | null = null
  try {
    parsedContent = content ? JSON.parse(content) : null
  } catch (e) {
    console.error('Failed to parse note content:', e)
  }

  const description = parsedContent
    ? getFirstParagraphWithText(parsedContent)
    : null

  // Early return if no valid content
  if (!parsedContent || !description) {
    return (
      <div className="mx-4 flex flex-col justify-start pb-3">
        <div className="text-left my-2 text-muted-foreground">
          No content available
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="mx-4 flex flex-col justify-start pb-3">
        <div className="line-clamp-1 text-left my-2">
          {description?.slice(0, 80)}
        </div>
        <div className="flex flex-col justify-center">
          <Button
            onClick={() => {
              setIsOpen(prev => !prev)
            }}
            className="p-2 gap-1"
            variant="ghost"
          >
            Preview note
            <Icons.caretSort className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Modal
        onClose={() => {
          setIsOpen(false)
        }}
        title="Code up"
        description={updatedAt ? format(updatedAt, 'MMMM dd, yyy') : ''}
        isOpen={isOpen}
        className="min-w-fit max-h-[70vh]"
      >
        <div className="flex flex-col gap-2">
          <div className="relative w-full max-h-[50vh] overflow-hidden">
            <NoteEditor
              editable={false}
              initialValue={parsedContent || '{}'}
              variant="readonly"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-background from-10% to-50%" />
          </div>
          <Link
            href={`/code-up/${noteId}/public-note`}
            className="p-1 text-muted-foreground underline self-center"
          >
            View full note
          </Link>
        </div>
      </Modal>
    </>
  )
}

export default TimelineNotesContent
