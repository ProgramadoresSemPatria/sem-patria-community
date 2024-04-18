import prismadb from '@/lib/prismadb'

import { Icons } from '@/components/icons'
import { NoContent } from '@/components/no-content'
import { SkeletonMentorshipPage } from '@/components/skeletons/skeleton-mentorship-page'
import { currentUser } from '@clerk/nextjs'
import { Suspense } from 'react'
import { ModuleCarousel } from '../module-carousel'

export const MentorshipSections = async () => {
  const user = await currentUser()
  const classrooms = await prismadb.classroom.findMany({
    include: {
      modules: {
        include: {
          videos: true
        }
      }
    }
  })

  const userProps = await prismadb.user.findUnique({
    where: {
      id: user?.id
    }
  })

  const formattedData = classrooms.map(classroom => {
    const modulesWithVideos = classroom.modules.map(module => {
      const videos = module.videos.map(video => {
        return video
      })

      return {
        id: module.id,
        title: module.title,
        fileUrl: module.fileUrl ?? undefined,
        classroomId: module.classroomId,
        videos
      }
    })

    const hasPermission = () => {
      if (!userProps) return false

      if (process.env.NODE_ENV === 'production') {
        return classroom.permissions.some(permission =>
          userProps.role.includes(permission)
        )
      }

      return true
    }

    return {
      id: classroom.id,
      title: classroom.title,
      modules: modulesWithVideos,
      hasPermission: hasPermission()
    }
  })

  return (
    <div className="flex flex-col gap-y-10">
      <Suspense fallback={<SkeletonMentorshipPage />}>
        {!formattedData.length && (
          <NoContent
            title="No classrooms created yet."
            description="Try contact the for any admin to add a new content."
          />
        )}
        {formattedData.map(classroom => (
          <div key={classroom.id} className="flex flex-col gap-y-3">
            <div className="flex items-center justify-between w-full">
              <h2 className="font-medium text-lg flex items-center">
                {classroom.title}
                {!classroom.hasPermission && (
                  <Icons.lock className="h-4 w-4 ml-2" />
                )}
              </h2>
              <span className="text-sm text-purple-700 font-medium">
                Drag to see more
              </span>
            </div>
            <ModuleCarousel
              modules={classroom.modules}
              hasPermission={classroom.hasPermission}
            />
          </div>
        ))}
      </Suspense>
    </div>
  )
}
