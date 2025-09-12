'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useNoteSupports } from './use-note-supports'
import { Icons } from '@/components/icons'
import { type ExtendedNote } from '@/lib/types'

type NoteSupportsProps = {
  note: ExtendedNote
  loggedInUserId: string
}

const NoteSupports = ({ note, loggedInUserId }: NoteSupportsProps) => {
  const { handleSupport, supportState, isPending } = useNoteSupports({
    note,
    loggedInUserId
  })

  if (!note) {
    return null
  }

  return (
    <div className="flex ml-2 items-center w-fit space-x-1 font-bold transition-colors dark:text-white text-black text-sm">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSupport}
        disabled={isPending}
        className={cn(
          'flex items-center gap-x-2 hover:bg-transparent hover:text-accent',
          isPending && 'cursor-not-allowed opacity-50'
        )}
      >
        <Icons.rocket
          data-user-supported={supportState.supported}
          className={cn(
            supportState.supported && 'text-primary',
            'data-[user-supported=true]:h-5 data-[user-supported=true]:w-5 h-4 w-4'
          )}
        />
        <span
          data-user-supported={supportState.supported}
          className="data-[user-supported=true]:text-primary font-semibold text-sm"
        >
          {supportState.supports}
        </span>
      </Button>
    </div>
  )
}

export default NoteSupports
