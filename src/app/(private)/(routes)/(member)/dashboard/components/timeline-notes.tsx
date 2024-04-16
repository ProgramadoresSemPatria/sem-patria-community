import avatarImg from '@/assets/avatar.png'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import prismadb from '@/lib/prismadb'
import { type Note } from '@prisma/client'
import { format } from 'date-fns'
import Image from 'next/image'
import TimelineNotesContent from './timeline-notes-content'

type TimelineNotesProps = {
  note: Note
}
export const TimelineNotes = async ({ note }: TimelineNotesProps) => {
  const userProps = await prismadb.user.findUnique({
    where: {
      id: note.userId
    }
  })

  return (
    <div className="flex flex-col relative">
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-violet-700" />
        <Avatar className="ml-4">
          <AvatarImage src={`https://github.com/${userProps?.username}.png`} />
          <AvatarFallback>
            <Image src={avatarImg.src} alt="avatar" width={40} height={40} />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-y-1 ml-2">
          <span className="font-semibold text-sm">{note.title}</span>
          <span className="font-semibold text-sm text-muted-foreground">
            @{userProps?.username ?? 'unknown'}
          </span>
        </div>
        <div className="ml-auto">
          <span className="text-muted-foreground font-medium text-sm">
            {format(note.updatedAt, 'MMMM dd, yyy')}
          </span>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <TimelineNotesContent content={note.content} />
      </div>
    </div>
  )
}
