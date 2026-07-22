import avatarImg from '@/assets/avatar.png'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import prismadb from '@/lib/prismadb'
import { type ExtendedNote } from '@/lib/types'
import { format } from 'date-fns'
import Image from 'next/image'
import TimelineNotesContent from './timeline-notes-content'
import { currentUser } from '@clerk/nextjs/server'

type TimelineNotesProps = {
  note: ExtendedNote
  lastNote: boolean
}
export const TimelineNotes = async ({ note, lastNote }: TimelineNotesProps) => {
  const user = await currentUser()
  const userProps = await prismadb.user.findUnique({
    where: {
      id: note.userId
    }
  })
  return (
    <div className="flex flex-col">
      <div className="flex items-center relative">
        <div className="w-2 h-2 rounded-full bg-brand-purple-400 dark:bg-brand-purple-600" />
        {!lastNote && (
          <div className="absolute w-1 h-[124px] rounded-sm bg-slate-100 dark:bg-brand-purple-800 left-[2px] -bottom-[106px]" />
        )}
        <Avatar className="ml-4">
          <AvatarImage src={userProps?.imageUrl ? userProps?.imageUrl : ''} />
          <AvatarFallback>
            <Image src={avatarImg.src} alt="avatar" width={40} height={40} />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-y-1 ml-2 max-w-72">
          <span className="font-semibold text-sm truncate">{note.title}</span>
          <span className="font-semibold text-sm truncate text-muted-foreground">
            {userProps?.username !== ''
              ? `@${userProps?.username}`
              : userProps?.name}
          </span>
        </div>
        <span className="text-muted-foreground font-medium text-sm ml-auto">
          {format(note.updatedAt, 'MMMM dd, yyy')}
        </span>
      </div>
      <TimelineNotesContent
        content={note.content}
        noteId={note.id}
        updatedAt={note.updatedAt}
        note={note}
        loggedInUserId={user?.id || ''}
      />
    </div>
  )
}
