import { SkeletonDefault } from '@/components/skeletons/skeleton-default'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import prismadb from '@/lib/prismadb'
import { Suspense } from 'react'
import { TimelineNotes } from './timeline-notes'

export const PublicNotesCard = async () => {
  const notes = await prismadb.note.findMany({
    where: {
      isPublic: true
    },
    take: 10
  })

  return (
    <div className="flex flex-col gap-y-2 h-full">
      <h2 className="text-lg font-semibold">Recents notes of our members</h2>
      <Card className="max-h-80">
        <CardHeader>
          <CardTitle>#ChallengeCodeUp Public notes of our members.</CardTitle>
          <CardDescription>
            The last notes writted of our members.
          </CardDescription>
        </CardHeader>
        <Suspense
          fallback={
            <div className="mx-6">
              <SkeletonDefault />
            </div>
          }
        >
          <CardContent className="h-52 overflow-y-auto">
            {notes.length === 0 && (
              <span className="font-medium text-muted-foreground">
                There are no notes to the challenge for now.
              </span>
            )}

            {notes.map((note, index) => {
              const lastNote = index === notes.length - 1 || notes.length === 1
              return (
                <TimelineNotes key={note.id} note={note} lastNote={lastNote} />
              )
            })}
          </CardContent>
        </Suspense>
      </Card>
    </div>
  )
}
