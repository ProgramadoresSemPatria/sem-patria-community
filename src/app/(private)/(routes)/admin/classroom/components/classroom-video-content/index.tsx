import { SkeletonDefault } from '@/components/skeletons/skeleton-default'
import prismadb from '@/lib/prismadb'
import { Suspense } from 'react'
import { ClassroomVideoTable } from './classroom-video-table'
import { NewClassroomVideoButton } from './new-classroom-video-button'

const VideoContent = async () => {
  const videos = await prismadb.video.findMany({
    include: {
      classroomModule: {
        select: {
          id: true,
          title: true
        }
      }
    }
  })

  return (
    <>
      <div className="w-full flex gap-x-4">
        <NewClassroomVideoButton />
      </div>
      <Suspense fallback={<SkeletonDefault />}>
        <ClassroomVideoTable data={videos} />
      </Suspense>
    </>
  )
}

export default VideoContent
