import { getScoreActivityBySeason } from '@/actions/season/get-score-activity-by-season'
import { DefaultLayout } from '@/components/default-layout'
import { Suspense } from 'react'
import ScoreTimeline from './components/score-timeline'
import ScoreTimelineSkeleton from './components/skeleton'

const ScoreActivitiesPage = async ({
  params
}: {
  params: { seasonId: string }
}) => {
  const formattedScoreActivities = await getScoreActivityBySeason(
    params.seasonId
  )

  return (
    <DefaultLayout>
      <Suspense fallback={<ScoreTimelineSkeleton />}>
        <ScoreTimeline
          initialData={formattedScoreActivities}
          initialDataCount={formattedScoreActivities.length}
          seasonId={params.seasonId}
        />
      </Suspense>
    </DefaultLayout>
  )
}

export default ScoreActivitiesPage
