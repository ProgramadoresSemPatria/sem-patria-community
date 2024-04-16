import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { EditorBubbleItem, useEditor } from 'novel'
import type { SelectorItem } from './node-selector'

export const TextButtons = () => {
  const { editor } = useEditor()
  if (!editor) return null

  const items: SelectorItem[] = [
    {
      name: 'bold',
      isActive: editor => editor.isActive('bold'),
      command: editor => editor.chain().focus().toggleBold().run(),
      icon: Icons.bold
    },
    {
      name: 'italic',
      isActive: editor => editor.isActive('italic'),
      command: editor => editor.chain().focus().toggleItalic().run(),
      icon: Icons.italic
    },
    {
      name: 'underline',
      isActive: editor => editor.isActive('underline'),
      command: editor => editor.chain().focus().toggleUnderline().run(),
      icon: Icons.underline
    },
    {
      name: 'strike',
      isActive: editor => editor.isActive('strike'),
      command: editor => editor.chain().focus().toggleStrike().run(),
      icon: Icons.strike
    },
    {
      name: 'code',
      isActive: editor => editor.isActive('code'),
      command: editor => editor.chain().focus().toggleCode().run(),
      icon: Icons.code
    }
  ]

  return (
    <div className="flex">
      {items.map((item, index) => (
        <EditorBubbleItem
          key={index}
          onSelect={editor => {
            item.command(editor)
          }}
        >
          <Button size="sm" className="rounded-none" variant="ghost">
            <item.icon
              className={cn('h-4 w-4', {
                'text-blue-500': item.isActive(editor)
              })}
            />
          </Button>
        </EditorBubbleItem>
      ))}
    </div>
  )
}
