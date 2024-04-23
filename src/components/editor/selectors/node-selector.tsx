import { type LucideIcon } from 'lucide-react'
import { EditorBubbleItem, useEditor, type EditorInstance } from 'novel'

import { Button } from '@/components//ui/button'
import { PopoverContent, PopoverTrigger } from '@/components//ui/popover'
import { Icons } from '@/components/icons'
import { Popover } from '@radix-ui/react-popover'

export type SelectorItem = {
  name: string
  icon: LucideIcon
  command: (editor: EditorInstance) => void
  isActive: (editor: EditorInstance) => boolean
}

export const nodeItems: SelectorItem[] = [
  {
    name: 'Text',
    icon: Icons.text,
    command: editor => editor.chain().focus().clearNodes().run(),
    isActive: editor =>
      editor.isActive('paragraph') &&
      !editor.isActive('bulletList') &&
      !editor.isActive('orderedList')
  },
  {
    name: 'Heading 1',
    icon: Icons.h1,
    command: editor =>
      editor.chain().focus().clearNodes().toggleHeading({ level: 1 }).run(),
    isActive: editor => editor.isActive('heading', { level: 1 })
  },
  {
    name: 'Heading 2',
    icon: Icons.h2,
    command: editor =>
      editor.chain().focus().clearNodes().toggleHeading({ level: 2 }).run(),
    isActive: editor => editor.isActive('heading', { level: 2 })
  },
  {
    name: 'Heading 3',
    icon: Icons.h3,
    command: editor =>
      editor.chain().focus().clearNodes().toggleHeading({ level: 3 }).run(),
    isActive: editor => editor.isActive('heading', { level: 3 })
  },
  {
    name: 'To-do List',
    icon: Icons.checkSquare,
    command: editor =>
      editor.chain().focus().clearNodes().toggleTaskList().run(),
    isActive: editor => editor.isActive('taskItem')
  },
  {
    name: 'Bullet List',
    icon: Icons.listBullet,
    command: editor =>
      editor.chain().focus().clearNodes().toggleBulletList().run(),
    isActive: editor => editor.isActive('bulletList')
  },
  {
    name: 'Numbered List',
    icon: Icons.listOrdered,
    command: editor =>
      editor.chain().focus().clearNodes().toggleOrderedList().run(),
    isActive: editor => editor.isActive('orderedList')
  },
  {
    name: 'Quote',
    icon: Icons.quote,
    command: editor =>
      editor.chain().focus().clearNodes().toggleBlockquote().run(),
    isActive: editor => editor.isActive('blockquote')
  },
  {
    name: 'Code',
    icon: Icons.code,
    command: editor =>
      editor.chain().focus().clearNodes().toggleCodeBlock().run(),
    isActive: editor => editor.isActive('codeBlock')
  }
]
interface NodeSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const NodeSelector = ({ open, onOpenChange }: NodeSelectorProps) => {
  const { editor } = useEditor()
  if (!editor) return null

  const activeItem = nodeItems.filter(item => item.isActive(editor)).pop() ?? {
    name: 'Multiple'
  }

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger
        asChild
        className="gap-2 rounded-none border-none hover:bg-accent focus:ring-0"
      >
        <Button size="sm" variant="ghost" className="gap-2">
          <span className="whitespace-nowrap text-sm">{activeItem.name}</span>
          <Icons.arrowDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={5} align="start" className="w-48 p-1">
        {nodeItems.map((item, index) => (
          <EditorBubbleItem
            key={index}
            onSelect={editor => {
              item.command(editor)
              onOpenChange(false)
            }}
            className="flex cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-accent"
          >
            <div className="flex items-center space-x-2">
              <div className="rounded-sm border p-1">
                <item.icon className="h-3 w-3" />
              </div>
              <span>{item.name}</span>
            </div>
            {activeItem.name === item.name && (
              <Icons.checkSimple className="h-4 w-4" />
            )}
          </EditorBubbleItem>
        ))}
      </PopoverContent>
    </Popover>
  )
}
