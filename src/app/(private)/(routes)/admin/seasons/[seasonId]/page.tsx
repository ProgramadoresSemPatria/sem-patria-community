import { DefaultLayout } from '@/components/default-layout'
import prismadb from '@/lib/prismadb'
import { NewSeasonForm } from './components/new-season-form'
import { type Season } from '@prisma/client'

const NewSeasonPage = async ({ params }: { params: { seasonId: string } }) => {
  const season = (await prismadb.season.findUnique({
    where: { id: params.seasonId }
  })) as Season

  return (
    <DefaultLayout>
      <NewSeasonForm initialData={season} />
    </DefaultLayout>
  )
}

export default NewSeasonPage
