'use client'
import { Toggle } from '@/components/ui/toggle'
import { type Editor } from '@tiptap/core'
import { useState } from 'react'
import { LinkSelector } from '../editor/selectors/link-selector'
import { nodeItems } from '../editor/selectors/node-selector'
import { textItems } from '../editor/selectors/text-buttons'
import { Icons } from '../icons'
import { ToolbarColorSelector } from './toolbar-color-selector'

interface ToolbarProps {
  editor: Editor | null
}

export const Toolbar = ({ editor }: ToolbarProps) => {
  const [openColor, setOpenColor] = useState(false)
  const [openLink, setOpenLink] = useState(false)
  if (!editor) return null

  return (
    <div className="flex w-fit max-w-[90vw] rounded-md border border-muted px-2 py-1 bg-background space-x-1">
      {nodeItems.map((item, index) => (
        <Toggle
          key={item.name}
          className='data-[state="on"]:bg-slate-900'
          size="sm"
          pressed={item.isActive(editor)}
          onPressedChange={() => {
            item.command(editor)
          }}
        >
          {item.name === 'Code' ? (
            <Icons.braces className="h-4 w-4" />
          ) : (
            <item.icon className="h-4 w-4" />
          )}
        </Toggle>
      ))}
      <span className="border border-muted" />
      <LinkSelector
        editor={editor}
        open={openLink}
        onOpenChange={setOpenLink}
        isToolbar
      />
      <span className="border border-muted" />
      {textItems.map((item, index) => (
        <Toggle
          key={item.name}
          className='data-[state="on"]:bg-slate-900'
          size="sm"
          pressed={item.isActive(editor)}
          onPressedChange={() => {
            item.command(editor)
          }}
        >
          <item.icon className="h-4 w-4" />
        </Toggle>
      ))}
      <span className="border border-muted" />
      <ToolbarColorSelector
        editor={editor}
        open={openColor}
        onOpenChange={setOpenColor}
      />
    </div>
  )
}
