import { CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import prismadb from '@/lib/prismadb'
import { TimelineNotes } from './timeline-notes'
import { Icons } from '@/components/icons'

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
          <div className="flex flex-col items-center justify-center h-full py-4">
            <Icons.notebookPen className="w-8 h-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              No notes have been created yet
            </p>
          </div>
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
