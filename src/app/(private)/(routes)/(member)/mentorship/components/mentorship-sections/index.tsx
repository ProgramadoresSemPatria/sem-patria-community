import prismadb from '@/lib/prismadb'

import { Icons } from '@/components/icons'
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
    <div className="mt-6 flex flex-col gap-y-10">
      <Suspense fallback={<SkeletonMentorshipPage />}>
        {formattedData.map(classroom => (
          <div key={classroom.id} className="flex flex-col gap-y-3">
            <h2 className="font-medium text-lg flex items-center">
              {classroom.title}
              {!classroom.hasPermission && (
                <Icons.lock className="h-4 w-4 ml-2" />
              )}
            </h2>
            <div className="flex flex-col gap-y-3">
              <ModuleCarousel
                modules={classroom.modules}
                hasPermission={classroom.hasPermission}
              />
            </div>
          </div>
        ))}
      </Suspense>
    </div>
  )
}
