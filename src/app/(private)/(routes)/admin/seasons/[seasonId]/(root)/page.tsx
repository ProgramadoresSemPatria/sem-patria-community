import { DefaultLayout } from '@/components/default-layout'
import prismadb from '@/lib/prismadb'
import { NewSeasonForm } from './components/new-season-form'
import { type Season, type PositionMultiplier } from '@prisma/client'

const NewSeasonPage = async ({ params }: { params: { seasonId: string } }) => {
  const season = (await prismadb.season.findUnique({
    where: { id: params.seasonId },
    include: {
      positionMultipliers: true
    }
  })) as Season & {
    positionMultipliers: PositionMultiplier[]
  }

  return (
    <DefaultLayout>
      <NewSeasonForm initialData={season} />
    </DefaultLayout>
  )
}

export default NewSeasonPage
