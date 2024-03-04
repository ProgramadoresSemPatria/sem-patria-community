import { Toggle } from '@/components/ui/toggle'
import { ListBulletIcon } from '@radix-ui/react-icons'
import { type Editor } from '@tiptap/react'
import {
  Bold,
  Heading1,
  Italic,
  ListOrdered,
  Strikethrough
} from 'lucide-react'
interface ToolbarProps {
  editor: Editor | null
}

export const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) return null

  return (
    <div className="flex items-center gap-1 border border-input bg-transparent rounded-md">
      <Toggle
        className='data-[state="on"]:bg-slate-700'
        size="sm"
        pressed={editor.isActive('heading')}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 className="h-4 w-4" />
      </Toggle>
      <Toggle
        className='data-[state="on"]:bg-slate-700'
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        className='data-[state="on"]:bg-slate-700'
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        className='data-[state="on"]:bg-slate-700'
        size="sm"
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <span
        className="
        border-l border-slate-600
        h-6
        mx-2
      "
      />
      <Toggle
        className='data-[state="on"]:bg-slate-700'
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <ListBulletIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        className='data-[state="on"]:bg-slate-700'
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
    </div>
  )
}
