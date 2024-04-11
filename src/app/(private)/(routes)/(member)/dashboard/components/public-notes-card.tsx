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
    <Card>
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
        <CardContent className="max-h-max=[500px] overflow-y-auto">
          {notes.length === 0 && (
            <span className="font-medium text-muted-foreground">
              There are no notes to the challenge for now.
            </span>
          )}

          {notes.map((note, i) => (
            <TimelineNotes key={note.id} note={note} hasDivider={i !== 0} />
          ))}
        </CardContent>
      </Suspense>
    </Card>
  )
}
