import { CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import prismadb from '@/lib/prismadb'
import { TimelineNotes } from './timeline-notes'

export const PublicNotesContent = async () => {
  const notes = await prismadb.note.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: 'desc' },
    take: 10
  })

  return (
    <ScrollArea className="h-full min-h-[200px] max-h-[calc(100vh-200px)]">
      <CardContent className="flex-grow overflow-hidden">
        {notes.length === 0 ? (
          <span className="font-medium text-muted-foreground">
            There are no notes to the challenge for now.
          </span>
        ) : (
          notes.map((note, idx) => (
            <TimelineNotes
              key={note.id}
              note={note}
              lastNote={idx === notes.length - 1 || notes.length === 1}
            />
          ))
        )}
      </CardContent>
    </ScrollArea>
  )
}
