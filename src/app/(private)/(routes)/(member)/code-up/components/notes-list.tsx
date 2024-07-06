'use client'
import { Badge } from '@/components/ui/badge'
import { useNoteStore } from '@/hooks/note/use-note-store'
import { appRoutes } from '@/lib/constants'
import { type Note } from '@prisma/client'
import { format } from 'date-fns'
import Link from 'next/link'
import { NoteOptions } from './note-options'

type NotesListProps = {
  notes: Note[]
}

export const NotesList = ({ notes }: NotesListProps) => {
  const { onChangeTitle } = useNoteStore()

  return (
    <div className="divide-y divide-border rounded-md border">
      {notes.map(note => (
        <div key={note.id} className="flex items-center justify-between p-4">
          <div className="grid gap-1">
            <Link
              href={`${appRoutes.codeUp}/${note.id}`}
              onClick={() => {
                onChangeTitle(note.title)
              }}
              className="font-semibold hover:underline truncate block pr-2"
            >
              {note.title}
            </Link>
            <div>
              <p className="text-sm to-muted-foreground">
                {format(note.createdAt, 'MMMM dd, yyy')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <Badge variant="secondary">
              {note.isPublic ? 'Public' : 'Private'}
            </Badge>
            <NoteOptions note={note} />
          </div>
        </div>
      ))}
    </div>
  )
}
