import { currentUser } from '@clerk/nextjs/server'
import prismadb from '@/lib/prismadb'
import { preBasePermissions, prePspPermissions } from '@/lib/constants'

export const getMentorships = async () => {
  const user = await currentUser()
  const classrooms = await prismadb.classroom.findMany({
    include: {
      modules: {
        include: {
          videos: {
            orderBy: {
              order: 'asc'
            }
          }
        },
        orderBy: {
          order: 'asc'
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
    let modulesWithVideos = classroom.modules.map(module => {
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

    const isPrePsp = userProps?.role.includes('PrePsp')
    const isPreBase = userProps?.role.includes('PreBase')

    if (isPreBase) {
      modulesWithVideos = modulesWithVideos.map(module => {
        const hasPreBaseRestriction = preBasePermissions[classroom.title]

        if (hasPreBaseRestriction) {
          const isPreBaseAllowed = hasPreBaseRestriction.some(
            permission => module.id === permission
          )

          return {
            ...module,
            isPreBaseAllowed
          }
        }

        return module
      })
    }

    if (isPrePsp) {
      modulesWithVideos = modulesWithVideos.map(module => {
        const hasPrePspRestriction = prePspPermissions[classroom.title]

        if (hasPrePspRestriction) {
          const isPrePspAllowed = hasPrePspRestriction.some(
            permission => module.id === permission
          )

          return {
            ...module,
            isPrePspAllowed
          }
        }

        return module
      })
    }

    const hasPermission = () => {
      if (!userProps) return false

      // Always enforce permissions regardless of environment
      return classroom.permissions.some(permission =>
        userProps.role.includes(permission)
      )
    }

    return {
      id: classroom.id,
      title: classroom.title,
      modules: modulesWithVideos,
      hasPermission: hasPermission()
    }
  })
  return formattedData
}
