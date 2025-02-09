import { Suspense } from 'react'
import { SkeletonDefault } from '@/components/skeletons/skeleton-default'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { PublicNotesContent } from './public-notes-content'

export const PublicNotesCard = async () => {
  return (
    <div className="flex flex-col gap-y-2 h-full">
      <h2 className="text-lg font-semibold">Recent notes of our members</h2>
      <Card className="flex flex-col flex-grow">
        <CardHeader className="flex flex-col">
          <CardTitle>
            <b>#ChallengeCodeUp</b> Public notes
          </CardTitle>
          <CardDescription>
            The last notes written by our members.
          </CardDescription>
        </CardHeader>

        <Suspense
          fallback={
            <div className="mx-6 flex-grow">
              <SkeletonDefault />
            </div>
          }
        >
          <PublicNotesContent />
        </Suspense>
      </Card>
    </div>
  )
}
