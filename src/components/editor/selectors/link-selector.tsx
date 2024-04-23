/* eslint-disable no-new */
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { type Editor } from '@tiptap/core'
import { Check, Trash } from 'lucide-react'
import { useEffect, useRef } from 'react'

export function isValidUrl(url: string) {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}
export function getUrlFromString(str: string) {
  if (isValidUrl(str)) return str
  try {
    if (str.includes('.') && !str.includes(' ')) {
      return new URL(`https://${str}`).toString()
    }
  } catch (e) {
    return null
  }
}
interface LinkSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editor: Editor | null
  isToolbar?: boolean
}

export const LinkSelector = ({
  open,
  onOpenChange,
  editor,
  isToolbar = false
}: LinkSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current && inputRef.current?.focus()
  })
  if (!editor) return null

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          data-istoolbar={isToolbar}
          className="gap-2 data-[istoolbar=false]:rounded-none border-none"
        >
          <Icons.redirect className="w-4 h-4" />
          <p
            className={cn('underline decoration-stone-400 underline-offset-4', {
              'text-blue-500': editor.isActive('link')
            })}
          >
            Link
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-60 p-0" sideOffset={10}>
        <form
          onSubmit={e => {
            const target = e.currentTarget as HTMLFormElement
            e.preventDefault()
            e.stopPropagation()
            const input = target[0] as HTMLInputElement
            const url = getUrlFromString(input.value)
            url && editor.chain().focus().setLink({ href: url }).run()
          }}
          className="flex  p-1 "
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Paste a link"
            className="flex-1 bg-background p-1 text-sm outline-none"
            defaultValue={editor.getAttributes('link').href || ''}
          />
          {editor.getAttributes('link').href ? (
            <Button
              size="icon"
              variant="outline"
              type="button"
              className="flex h-8 items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800"
              onClick={() => {
                editor.chain().focus().unsetLink().run()
              }}
            >
              <Trash className="h-4 w-4" />
            </Button>
          ) : (
            <Button size="icon" className="h-8">
              <Check className="h-4 w-4" />
            </Button>
          )}
        </form>
      </PopoverContent>
    </Popover>
  )
}
