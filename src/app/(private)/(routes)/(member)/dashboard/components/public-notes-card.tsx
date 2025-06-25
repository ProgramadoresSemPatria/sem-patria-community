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
      <h2 className="text-lg font-semibold mb-2">
        Recent notes of our members
      </h2>
      <Card className="flex flex-col flex-1">
        <CardHeader>
          <CardTitle>
            <b>#ChallengeCodeUp</b>&#58; Public notes
          </CardTitle>
          <CardDescription>
            The last notes written by our members
          </CardDescription>
        </CardHeader>

        <Suspense
          fallback={
            <div className="mx-6 flex-1">
              <SkeletonDefault />
            </div>
          }
        >
          <div className="flex-1 flex flex-col">
            <PublicNotesContent />
          </div>
        </Suspense>
      </Card>
    </div>
  )
}
