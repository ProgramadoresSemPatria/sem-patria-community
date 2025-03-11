import { DefaultLayout } from '@/components/default-layout'
import prismadb from '@/lib/prismadb'

// TODO: Implement new Form component
const NewSeasonPage = async ({ params }: { params: { seasonId: string } }) => {
  const season = await prismadb.season.findUnique({
    where: { id: params.seasonId }
  })

  return <DefaultLayout>NewForm</DefaultLayout>
}

export default NewSeasonPage
