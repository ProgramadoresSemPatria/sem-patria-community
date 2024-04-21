import { Icons } from '@/components/icons'
import { Toggle } from '@/components/ui/toggle'
import { type Editor } from '@tiptap/react'
interface ToolbarProps {
  editor: Editor | null
}

export const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) return null

  return (
    <div className="flex items-center gap-1 border border-input bg-transparent rounded-md">
      <Toggle
        className='data-[state="on"]:bg-slate-900'
        size="sm"
        pressed={editor.isActive('heading')}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Icons.h1 className="h-4 w-4" />
      </Toggle>
      <Toggle
        className='data-[state="on"]:bg-slate-900'
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Icons.bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        className='data-[state="on"]:bg-slate-900'
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Icons.italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        className='data-[state="on"]:bg-slate-900'
        size="sm"
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Icons.strike className="h-4 w-4" />
      </Toggle>
      <span
        className="
        border-l border-slate-600
        h-6
        mx-2
      "
      />
      <Toggle
        className='data-[state="on"]:bg-slate-900'
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <Icons.listBullet className="h-4 w-4" />
      </Toggle>
      <Toggle
        className='data-[state="on"]:bg-slate-900'
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <Icons.listOrdered className="h-4 w-4" />
      </Toggle>
    </div>
  )
}
