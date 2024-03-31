import prismadb from '@/lib/prismadb'
import { NewUserForm } from './components/new-user-form'

const NewUserPage = async ({ params }: { params: { userId: string } }) => {
  const user = await prismadb.user.findUnique({
    where: { id: params.userId }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <NewUserForm initialData={user} />
      </div>
    </div>
  )
}

export default NewUserPage
