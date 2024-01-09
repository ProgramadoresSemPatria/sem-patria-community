import { appRoutes } from '@/lib/constants'
import { type Note } from '@prisma/client'
import { format } from 'date-fns'
import Link from 'next/link'
import { NoteOptions } from './note-options'

type NotesListProps = {
  notes: Note[]
}

export const NotesList = ({ notes }: NotesListProps) => {
  return (
    <div className="divide-y divide-border rounded-md border">
      {notes.map(note => (
        <div key={note.id} className="flex items-center justify-between p-4">
          <div className="grid gap-1">
            <Link
              href={`${appRoutes.codeUp}/${note.id}`}
              className="font-semibold hover:underline"
            >
              {note.title}
            </Link>
            <div>
              <p className="text-sm to-muted-foreground">
                {format(note.createdAt, 'MMMM dd, yyy')}
              </p>
            </div>
          </div>
          <NoteOptions noteId={note.id} />
        </div>
      ))}
    </div>
  )
}
