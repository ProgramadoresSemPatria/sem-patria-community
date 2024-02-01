import { Icons } from '@/components/icons'
import { SkeletonDefault } from '@/components/skeletons/skeleton-default'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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

export const ChallengeCommitCard = async () => {
  const notes = await prismadb.note.findMany({
    where: {
      title: {
        contains: '#100DaysOfCommit'
      }
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Challenge #100DaysOfCommit</CardTitle>
        <CardDescription>
          These are the last notes of our members.
        </CardDescription>
      </CardHeader>
      <Suspense
        fallback={
          <div className="mx-6">
            <SkeletonDefault />
          </div>
        }
      >
        <CardContent>
          <Alert className="max-w-fit mb-6">
            <Icons.rocket className="h-4 w-4" />
            <AlertTitle>Make your part!</AlertTitle>
            <AlertDescription className="text-sm">
              Create a note with the hashtag #100DaysOfCommit and show it to all
              your dedication.
            </AlertDescription>
          </Alert>

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
