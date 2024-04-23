'use client'
import 'highlight.js/styles/tokyo-night-dark.css'
import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
  type JSONContent
} from 'novel'
import { ImageResizer, handleCommandNavigation } from 'novel/extensions'
import { useEffect, useState } from 'react'
import { defaultExtensions } from './extensions'
import { ColorSelector } from './selectors/color-selector'
import { LinkSelector } from './selectors/link-selector'
import { NodeSelector } from './selectors/node-selector'

import { Separator } from '@/components/ui/separator'
import { type Editor } from '@tiptap/core'
import { handleImageDrop, handleImagePaste } from 'novel/plugins'
import { Toolbar } from '../rich-text-input/toolbar'
import { uploadFn } from './image-upload'
import { TextButtons } from './selectors/text-buttons'
import { slashCommand, suggestionItems } from './slash-command'

const extensions = [...defaultExtensions, slashCommand]

interface EditorProp {
  initialValue?: JSONContent
  onChange?: (value: string) => void
  editable?: boolean
  hasToolbar?: boolean
  isSubmitting?: boolean
}
const NoteEditor = ({
  initialValue,
  onChange,
  editable = true,
  hasToolbar = false,
  isSubmitting = false
}: EditorProp) => {
  const [openNode, setOpenNode] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [openLink, setOpenLink] = useState(false)
  const [editor, setEditor] = useState<Editor | null>(null)

  useEffect(() => {
    if (isSubmitting) {
      editor?.commands.setContent(null)
    }
  }, [editor?.commands, isSubmitting])

  return (
    <div
      data-hastoolbar={hasToolbar}
      className="flex flex-col justify-stretch mb-2 gap-1 rounded-lg data-[hastoolbar=true]:p-2 data-[hastoolbar=true]:bg-slate-900"
    >
      {hasToolbar && editable && <Toolbar editor={editor as Editor} />}
      <EditorRoot>
        <EditorContent
          className="w-full data-[hastoolbar=false]:border py-2 px-6 rounded-xl my-4"
          {...(initialValue && { initialContent: initialValue })}
          extensions={extensions}
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event)
            },
            handlePaste: (view, event) =>
              handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),

            attributes: {
              class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full ${
                editable && !hasToolbar && 'min-h-screen'
              } ${
                hasToolbar && 'min-h-[200px]'
              } h-fit prose-ol:m-0 prose-ul:m-0 prose-headings:m-0 prose-code:m-0`
            }
          }}
          onUpdate={({ editor }) => {
            if (onChange) {
              if (editor.getText() !== '') {
                onChange(JSON.stringify(editor.getJSON()))
              } else {
                onChange('')
              }
            }
          }}
          editable={editable}
          slotAfter={editable ?? <ImageResizer />}
          onCreate={({ editor }: { editor: Editor }) => {
            setEditor(editor)
          }}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-slate-800 scrollbar-thumb-rounded-sm">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map(item => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={val => item.command?.(val)}
                  className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>
          {!hasToolbar && (
            <EditorBubble
              tippyOptions={{
                placement: 'top'
              }}
              className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
            >
              <Separator orientation="vertical" />
              <NodeSelector open={openNode} onOpenChange={setOpenNode} />
              <Separator orientation="vertical" />

              <LinkSelector
                editor={editor}
                open={openLink}
                onOpenChange={setOpenLink}
              />
              <Separator orientation="vertical" />
              <TextButtons />
              <Separator orientation="vertical" />
              <ColorSelector open={openColor} onOpenChange={setOpenColor} />
            </EditorBubble>
          )}
        </EditorContent>
      </EditorRoot>
    </div>
  )
}

export default NoteEditor
