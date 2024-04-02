import { DefaultLayout } from '@/components/default-layout'
import prismadb from '@/lib/prismadb'
import { NewUserForm } from './components/new-user-form'

const NewUserPage = async ({ params }: { params: { userId: string } }) => {
  const user = await prismadb.user.findUnique({
    where: { id: params.userId }
  })

  return (
    <DefaultLayout>
      <NewUserForm initialData={user} />
    </DefaultLayout>
  )
}

export default NewUserPage
