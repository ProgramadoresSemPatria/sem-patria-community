import avatarImg from '@/assets/avatar.png'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import prismadb from '@/lib/prismadb'
import { type Note } from '@prisma/client'
import { format } from 'date-fns'
import Image from 'next/image'
import TimelineNotesContent from './timeline-notes-content'

type TimelineNotesProps = {
  note: Note
  lastNote: boolean
}
export const TimelineNotes = async ({ note, lastNote }: TimelineNotesProps) => {
  const userProps = await prismadb.user.findUnique({
    where: {
      id: note.userId
    }
  })

  return (
    <div className="flex flex-col">
      <div className="flex items-center relative">
        <div className="w-2 h-2 rounded-full bg-violet-400 dark:bg-violet-600" />
        {!lastNote && (
          <div className="absolute w-1 h-[72px] rounded-sm bg-slate-100 dark:bg-violet-950 left-[2px] -bottom-[59px]" />
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
            @{userProps?.username ?? 'unknown'}
          </span>
        </div>
        <span className="text-muted-foreground font-medium text-sm ml-auto">
          {format(note.updatedAt, 'MMMM dd, yyy')}
        </span>
      </div>
      <div className="w-full flex justify-center pb-3">
        <TimelineNotesContent content={note.content} noteId={note.id} />
      </div>
    </div>
  )
}
