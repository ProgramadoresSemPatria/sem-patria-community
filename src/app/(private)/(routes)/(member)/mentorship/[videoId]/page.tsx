import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { appRoutes } from '@/lib/constants'
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'
import { ButtonMarkAsWatched } from './components/button-mark-as-watched'
import { Comments } from './components/comments'
import { MentorshipHeader } from './components/mentorship-header'
import MentorshipTab from './components/mentorship-tab'

const ProgramPage = async ({ params }: { params: { videoId: string } }) => {
  const videoSelected = await prismadb.video.findUnique({
    where: {
      id: params.videoId
    }
  })

  if (!videoSelected) redirect(appRoutes.mentorship)

  const moduleVideos = await prismadb.video.findMany({
    where: {
      classroomModuleId: videoSelected.classroomModuleId
    }
  })

  return (
    <>
      <MentorshipHeader videoTitle={videoSelected.title} />
      <div className="overflow-auto">
        <div className="flex flex-col md:flex-row md:col h-full box-border overflow-x-auto md:overflow-hidden">
          <div className="flex flex-col flex-1 flex-shrink-0 w-full md:overflow-y-auto transition-[height]">
            <iframe
              src={videoSelected.url}
              title={videoSelected.title}
              className="h-[calc(77vh-60px)] w-full"
            />
            <div className="w-full flex justify-between items-center pl-4 pt-2">
              <Breadcrumb className="p-0">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={appRoutes.mentorship}>
                      Mentorship
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{videoSelected.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <ButtonMarkAsWatched videoProps={videoSelected} />
            </div>
            <h1 className="p-4 font-bold text-2xl">{videoSelected.title}</h1>
            <Comments />
          </div>
          <MentorshipTab
            videoProps={videoSelected}
            moduleVideos={moduleVideos}
          />
        </div>
      </div>
    </>
  )
}

export default ProgramPage
