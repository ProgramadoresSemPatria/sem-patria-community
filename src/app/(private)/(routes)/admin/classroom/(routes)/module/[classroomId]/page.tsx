import { DefaultLayout } from '@/components/default-layout'
import prismadb from '@/lib/prismadb'
import { NewClassroomModuleForm } from './components/new-classroom-module-form'

const NewClassroomModulePage = async ({
  params
}: {
  params: { classroomId: string }
}) => {
  const classroom = await prismadb.classroom.findFirst({
    where: { id: params.classroomId }
  })

  return (
    <DefaultLayout>
      <NewClassroomModuleForm initialData={classroom} />
    </DefaultLayout>
  )
}

export default NewClassroomModulePage
