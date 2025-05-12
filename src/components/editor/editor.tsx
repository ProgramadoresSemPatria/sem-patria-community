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
import {
  ImageResizer,
  Placeholder,
  handleCommandNavigation
} from 'novel/extensions'
import { defaultExtensions } from './extensions'
import { ColorSelector } from './selectors/color-selector'
import { LinkSelector } from './selectors/link-selector'
import { NodeSelector } from './selectors/node-selector'

import { Separator } from '@/components/ui/separator'
import { type Editor } from '@tiptap/core'
import { cva } from 'class-variance-authority'
import { handleImageDrop, handleImagePaste } from 'novel/plugins'
import { Toolbar } from '../rich-text-input/toolbar'
import { TextButtons } from './selectors/text-buttons'
import { useSuggestionItems } from './slash-command'
import { useEditorState } from './use-editor-state'
import { useEditorUploadFile } from './use-image-upload'
import { MentionExtension } from './mention-extension'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { type User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { Command, CommandItem, CommandList } from '../ui/command'
import type { SuggestionProps } from '@tiptap/suggestion'

export type MentionState = SuggestionProps & {
  active: boolean
  items: User[]
  selectedIndex: number
}

interface EditorProp {
  initialValue?: JSONContent
  onChange?: (value: string) => void
  editable?: boolean
  hasToolbar?: boolean
  isSubmitting?: boolean
  variant?: 'note' | 'readonly' | 'videoCommentInput' | 'postInput'
}
const NoteEditor = ({
  initialValue,
  onChange,
  editable = true,
  hasToolbar = false,
  isSubmitting = false,
  variant = 'note'
}: EditorProp) => {
  const router = useRouter()
  const {
    editor,
    openColor,
    openLink,
    openNode,
    setOpenColor,
    setEditor,
    setOpenLink,
    setOpenNode,
    filteredSuggestionItems,
    hasH1TitleEnabled
  } = useEditorState({ isSubmitting, variant })

  const { uploadFn, handleValidateImageWasDeleted } = useEditorUploadFile()
  const [mentionState, setMentionState] = useState<MentionState>({
    editor: editor as Editor,
    range: { from: 0, to: 0 },
    query: '',
    text: '',
    active: false,
    items: [],
    command: () => {},
    clientRect: () => null,
    decorationNode: null,
    selectedIndex: 0
  })

  const attributeVariants = cva(
    'prose prose-lg dark:prose-invert text-black dark:text-white prose-headings:font-title font-default focus:outline-none max-w-full h-fit prose-ol:m-0 prose-ul:m-0 prose-headings:m-0 prose-code:m-0 [&_.mention]:bg-accent [&_.mention]:text-accent-foreground [&_.mention]:px-1 [&_.mention]:rounded [&_.mention]:cursor-pointer [&_.mention]:hover:bg-accent/80',
    {
      variants: {
        variant: {
          note: 'h-fit',
          readonly: '',
          videoCommentInput: 'min-h-[200px]',
          postInput: ''
        }
      },
      defaultVariants: {
        variant: 'note'
      }
    }
  )

  const { slashCommand } = useSuggestionItems()
  const extensions = [
    ...defaultExtensions,
    slashCommand,
    MentionExtension(setMentionState)
  ]
  useEffect(() => {
    const fetchMentionUsers = async () => {
      if (!mentionState.active || !mentionState.query) return

      try {
        const res = await api.get('/api/user', {
          params: {
            query: mentionState.query
          }
        })
        const data = await res.data
        console.log('data', data)

        setMentionState(prev => ({
          ...prev,
          items: data || []
        }))
      } catch (err) {
        console.error('Failed to fetch mentions:', err)
      }
    }

    const debounce = setTimeout(fetchMentionUsers, 400)

    return () => {
      clearTimeout(debounce)
    }
  }, [mentionState.active, mentionState.query])

  const handleMentionClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement
    if (target.classList.contains('mention')) {
      const username = target.textContent?.replace('@', '')
      console.log('Mention clicked:', username)

      router.push(`/user/${username}`)
    }
  }

  return (
    <div
      data-hastoolbar={hasToolbar}
      className="flex flex-col max-w-full w-[100%] justify-stretch mb-2 gap-1 rounded-lg data-[hastoolbar=true]:p-2 dark:data-[hastoolbar=true]:bg-card data-[hastoolbar=true]:bg-card"
      onClick={handleMentionClick}
    >
      {hasToolbar && editable && (
        <Toolbar
          hasTitleEnabled={hasH1TitleEnabled}
          editor={editor as Editor}
        />
      )}
      <EditorRoot>
        <EditorContent
          className="w-full data-[hastoolbar=false]:border py-2 px-6 rounded-xl my-4"
          {...(initialValue && { initialContent: initialValue })}
          extensions={[
            ...extensions,
            Placeholder.configure({
              placeholder:
                variant !== 'postInput'
                  ? "Write or press '/' for commands..."
                  : 'Start writing...'
            })
          ]}
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event)
            },
            handlePaste: (view, event) => {
              handleImagePaste(view, event, uploadFn)
            },
            handleDrop: (view, event, _slice, moved) => {
              handleImageDrop(view, event, moved, uploadFn)
            },
            attributes: {
              class: attributeVariants({ variant })
            }
          }}
          onUpdate={({ editor, transaction }) => {
            if (onChange) {
              if (editor.getText() !== '') {
                const previousContent = transaction.before.content.toJSON()
                const currentContent = editor.getJSON()
                handleValidateImageWasDeleted({
                  previousContent,
                  currentContent: currentContent.content || []
                })

                onChange(JSON.stringify(currentContent))
              } else {
                onChange('{}')
              }
            }
          }}
          editable={editable && !isSubmitting}
          slotAfter={editable ?? <ImageResizer />}
          onCreate={({ editor }: { editor: Editor }) => {
            setEditor(editor)
          }}
        >
          {variant !== 'postInput' && (
            <EditorCommand className="z-100 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all scrollbar-thin scrollbar-thumb-brand-black-700  scrollbar-track-card scrollbar-thumb-rounded-sm">
              <EditorCommandEmpty className="px-2 text-muted-foreground">
                No results
              </EditorCommandEmpty>
              <EditorCommandList>
                {filteredSuggestionItems.map(item => (
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
          )}
          {!hasToolbar && (
            <EditorBubble
              tippyOptions={{
                placement: 'top'
              }}
              className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
            >
              <Separator orientation="vertical" />
              <NodeSelector
                open={openNode}
                onOpenChange={setOpenNode}
                hasTitleEnabled={hasH1TitleEnabled}
              />
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
          {mentionState.active && (
            <div className="z-50">
              <Command className="w-64 rounded-md border shadow-md bg-popover">
                <CommandList>
                  {mentionState.items?.length > 0 ? (
                    mentionState.items.map((item, index: number) => (
                      <CommandItem
                        key={item.id}
                        onSelect={() => {
                          if (mentionState.command) {
                            mentionState.command({ label: item.username })
                          }
                        }}
                        className={
                          index === mentionState.selectedIndex
                            ? 'bg-accent text-accent-foreground'
                            : ''
                        }
                      >
                        @{item.username}
                      </CommandItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-muted-foreground">
                      No users found
                    </div>
                  )}
                </CommandList>
              </Command>
            </div>
          )}
        </EditorContent>
      </EditorRoot>
    </div>
  )
}

export default NoteEditor
