'use client'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import { Toolbar } from './toolbar'
interface RichTextEditorProps {
  content: string
  onChange: (value: string) => void
  isSubmitting?: boolean
}
export const RichTextEditor = ({
  onChange,
  content,
  isSubmitting
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: 'Add a comment...',
        emptyEditorClass: 'is-editor-empty'
      }),
      StarterKit.configure({
        heading: {
          HTMLAttributes: {
            class: 'text-xl font-bold'
          }
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-4'
          }
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-4'
          }
        }
      })
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'px-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
      }
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    }
  })

  useEffect(() => {
    if (isSubmitting) {
      editor?.commands.setContent('')
    }
  }, [editor?.commands, isSubmitting])

  return (
    <div className="flex flex-col justify-stretch mb-2 gap-1 rounded-md border p-2 bg-slate-800">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
