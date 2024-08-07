import { common, createLowlight } from 'lowlight'
import {
  HorizontalRule,
  StarterKit,
  TaskItem,
  TaskList,
  TiptapImage,
  TiptapLink,
  UpdatedImage
} from 'novel/extensions'
import { UploadImagesPlugin } from 'novel/plugins'
import AutoJoiner from 'tiptap-extension-auto-joiner'
import GlobalDragHandle from 'tiptap-extension-global-drag-handle'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Youtube from '@tiptap/extension-youtube'
import { cx } from 'class-variance-authority'

const lowlight = createLowlight(common)

const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cx(
      'text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer text-black dark:text-white'
    )
  }
})

const tiptapImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: cx('opacity-40 rounded-lg')
      })
    ]
  }
}).configure({
  allowBase64: true,
  HTMLAttributes: {
    class: cx('rounded-lg')
  }
})

const updatedImage = UpdatedImage.configure({
  HTMLAttributes: {
    class: cx('rounded-lg')
  }
})

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cx('not-prose pl-2 ')
  }
})
const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cx('flex gap-2 items-start my-4')
  },
  nested: true
})

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cx('mt-4 mb-6 border-t border-muted-foreground')
  }
})

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cx('list-disc list-outside leading-3 -mt-2')
    }
  },
  orderedList: {
    HTMLAttributes: {
      class: cx('list-decimal list-outside leading-3 -mt-2')
    }
  },
  listItem: {
    HTMLAttributes: {
      class: cx('leading-normal -mb-2')
    }
  },
  blockquote: {
    HTMLAttributes: {
      class: cx('border-l-4 border-primary')
    }
  },
  codeBlock: {
    HTMLAttributes: {
      class: cx(
        'rounded-md bg-muted text-muted-foreground border p-5 font-mono font-medium'
      )
    }
  },
  code: {
    HTMLAttributes: {
      class: cx('rounded-md bg-muted  px-1.5 py-1 font-mono font-medium'),
      spellcheck: 'false'
    }
  },
  horizontalRule: false,
  dropcursor: {
    color: '#DBEAFE',
    width: 4
  },
  gapcursor: false
})

const dragHandle = GlobalDragHandle.configure({
  dragHandleWidth: 20,
  scrollTreshold: 100
})

const autoJoiner = AutoJoiner

const codeblockLowlight = CodeBlockLowlight.configure({
  lowlight,
  defaultLanguage: 'plaintext'
})

const youtubeEmbed = Youtube.configure({
  interfaceLanguage: 'en',
  width: '100%' as unknown as number
})

export const defaultExtensions = [
  starterKit,
  tiptapLink,
  tiptapImage,
  updatedImage,
  taskList,
  taskItem,
  horizontalRule,
  dragHandle,
  autoJoiner,
  codeblockLowlight,
  youtubeEmbed
]
