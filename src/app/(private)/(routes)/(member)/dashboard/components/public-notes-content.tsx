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
    <ScrollArea className="flex-1 h-[calc(100vh-300px)]">
      <CardContent className="flex flex-col gap-6 py-6">
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
