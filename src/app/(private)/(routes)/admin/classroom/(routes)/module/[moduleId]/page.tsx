import { DefaultLayout } from '@/components/default-layout'
import prismadb from '@/lib/prismadb'
import { NewClassroomModuleForm } from './components/new-classroom-module-form'

const NewClassroomModulePage = async ({
  params
}: {
  params: { moduleId: string }
}) => {
  const module = await prismadb.classroomModule.findUnique({
    where: { id: params.moduleId }
  })

  const classrooms = await prismadb.classroom.findMany()

  return (
    <DefaultLayout>
      <NewClassroomModuleForm initialData={module} classrooms={classrooms} />
    </DefaultLayout>
  )
}

export default NewClassroomModulePage
