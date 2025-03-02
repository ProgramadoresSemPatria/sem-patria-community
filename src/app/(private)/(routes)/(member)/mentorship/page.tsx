import { DefaultLayout } from '@/components/default-layout'
import Header from '@/components/header'
import { MentorshipSections } from './components/mentorship-sections'
import { prePspPermissions } from '@/lib/constants'
import { currentUser } from '@clerk/nextjs/server'
import prismadb from '@/lib/prismadb'

const Mentorship = async () => {
  const user = await currentUser()
  const classrooms = await prismadb.classroom.findMany({
    include: {
      modules: {
        include: {
          videos: true
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
    <DefaultLayout>
      <Header title="Mentorship" />
      <MentorshipSections data={formattedData} />
    </DefaultLayout>
  )
}

export default Mentorship
