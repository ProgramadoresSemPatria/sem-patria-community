'use client'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Toolbar } from './toolbar'
interface RichTextEditorProps {
  content: string
  onChange: (value: string) => void
}
export const RichTextEditor = ({ onChange, content }: RichTextEditorProps) => {
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
          'rounded-md border min-h-[150px] p-2 ring-offset-2 bg-background disabled:cursor-not-allowed disabled:opacity-50'
      }
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
      console.log(editor.getHTML())
    }
  })

  return (
    <div className="flex flex-col justify-stretch min-h-[250px] gap-1">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
