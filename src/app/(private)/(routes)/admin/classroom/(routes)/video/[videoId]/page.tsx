import { DefaultLayout } from '@/components/default-layout'
import prismadb from '@/lib/prismadb'
import { NewClassroomVideoForm } from './components/new-classroom-video-form'
import { type ModulesByClassroomProps } from './components/new-classroom-video-form/types'

const NewClassroomVideoPage = async ({
  params
}: {
  params: { videoId: string }
}) => {
  const video = await prismadb.video.findUnique({
    where: { id: params.videoId },
    include: {
      attachments: true
    }
  })

  const modules = await prismadb.classroomModule.findMany({
    include: {
      classroom: true
    }
  })

  const modulesByClassroom: ModulesByClassroomProps[] = modules.map(module => {
    return {
      id: module.id,
      title: module.title,
      classroomName: module.classroom.title
    }
  })

  return (
    <DefaultLayout>
      <NewClassroomVideoForm initialData={video} modules={modulesByClassroom} />
    </DefaultLayout>
  )
}

export default NewClassroomVideoPage
