import { DefaultLayout } from '@/components/default-layout'
import prismadb from '@/lib/prismadb'
import { NewInterestForm } from './components/new-interest-form'

const NewInterestPage = async ({
  params
}: {
  params: { interestId: string }
}) => {
  const interest = await prismadb.interest.findUnique({
    where: { id: params.interestId }
  })

  return (
    <DefaultLayout className="flex-col">
      <NewInterestForm initialData={interest} />
    </DefaultLayout>
  )
}

export default NewInterestPage
