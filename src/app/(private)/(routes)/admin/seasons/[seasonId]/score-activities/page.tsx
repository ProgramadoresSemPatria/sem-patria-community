import { getScoreActivityBySeason } from '@/actions/season/get-score-activity-by-season'
import { DefaultLayout } from '@/components/default-layout'
import ScoreTimeline from './components/score-timeline'

const ScoreActivitiesPage = async ({
  params,
  searchParams
}: {
  params: { seasonId: string }
  searchParams: { page?: string }
}) => {
  const page = Number(searchParams.page) || 1
  const limit = 10

  const data = await getScoreActivityBySeason(params.seasonId, page, limit)

  return (
    <DefaultLayout>
      <ScoreTimeline
        initialData={data.activities}
        page={page}
        limit={limit}
        total={data.total}
      />
    </DefaultLayout>
  )
}

export default ScoreActivitiesPage
