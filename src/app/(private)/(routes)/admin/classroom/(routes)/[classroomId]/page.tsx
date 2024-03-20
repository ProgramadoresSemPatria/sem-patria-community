import { DefaultLayout } from '@/components/default-layout'
import prismadb from '@/lib/prismadb'
import { NewClassroomForm } from './components/new-classroom-form'

const NewClassroomPage = async ({
  params
}: {
  params: { classroomId: string }
}) => {
  const classroom = await prismadb.classroom.findFirst({
    where: { id: params.classroomId }
  })

  return (
    <DefaultLayout>
      <NewClassroomForm initialData={classroom} />
    </DefaultLayout>
  )
}

export default NewClassroomPage
