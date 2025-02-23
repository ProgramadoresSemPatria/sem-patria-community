import { EditorBubbleItem, useEditor } from 'novel'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useTheme } from 'next-themes'
import {
  DARK_TEXT_COLORS,
  HIGHLIGHT_COLORS,
  LIGHT_TEXT_COLORS
} from '../colors'

interface ColorSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ColorSelector = ({ open, onOpenChange }: ColorSelectorProps) => {
  const { resolvedTheme } = useTheme()
  const { editor } = useEditor()

  const TEXT_COLORS =
    resolvedTheme === 'light' ? LIGHT_TEXT_COLORS : DARK_TEXT_COLORS

  if (!editor) return null
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive('textStyle', { color })
  )

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive('highlight', { color })
  )

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="sm" className="gap-2 rounded-none" variant="ghost">
          <span
            className="rounded-sm px-1"
            style={{
              color: activeColorItem?.color,
              backgroundColor: activeHighlightItem?.color
            }}
          >
            A
          </span>
          <Icons.arrowDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={5}
        className="my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border p-1 shadow-xl scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-slate-800 scrollbar-thumb-rounded-sm"
        align="start"
      >
        <div className="flex flex-col">
          <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">
            Color
          </div>
          {TEXT_COLORS.map(({ name, color }, index) => (
            <EditorBubbleItem
              key={index}
              onSelect={() => {
                editor.commands.unsetColor()
                name !== 'Default' &&
                  editor
                    .chain()
                    .focus()
                    .setColor(color || '')
                    .run()
              }}
              className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <div
                  className="rounded-sm border px-2 py-px font-medium"
                  style={{ color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
            </EditorBubbleItem>
          ))}
        </div>
        <div>
          <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">
            Background
          </div>
          {HIGHLIGHT_COLORS.map(({ name, color }, index) => (
            <EditorBubbleItem
              key={index}
              onSelect={() => {
                editor.commands.unsetHighlight()
                name !== 'Default' && editor.commands.setHighlight({ color })
              }}
              className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <div
                  className="rounded-sm border px-2 py-px font-medium"
                  style={{ backgroundColor: color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive('highlight', { color }) && (
                <Icons.checkSimple className="h-4 w-4" />
              )}
            </EditorBubbleItem>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
