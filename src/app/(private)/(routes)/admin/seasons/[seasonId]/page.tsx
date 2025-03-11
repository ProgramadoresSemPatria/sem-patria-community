import { DefaultLayout } from '@/components/default-layout'
import prismadb from '@/lib/prismadb'
import { NewSeasonForm } from './components/new-season-form'
import { type Season } from '../components/columns'

const NewSeasonPage = async ({ params }: { params: { seasonId: string } }) => {
  const retrievedSeason = (await prismadb.season.findUnique({
    where: { id: params.seasonId }
  })) as Season

  return (
    <DefaultLayout>
      <NewSeasonForm season={retrievedSeason} />
    </DefaultLayout>
  )
}

export default NewSeasonPage
