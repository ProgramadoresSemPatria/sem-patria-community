import { SkeletonDefault } from '@/components/skeletons/skeleton-default'
import prismadb from '@/lib/prismadb'
import { Suspense } from 'react'
import { type ClassroomModuleColumn } from './columns'
import { NewClassroomModuleButton } from './new-classroom-module-button'
import { ClassroomModuleTable } from './classroom-module-table'

const ModuleContent = async () => {
  const data = await prismadb.classroomModule.findMany({
    include: {
      videos: true,
      classroom: true
    }
  })

  const formattedData: ClassroomModuleColumn[] = data.map(module => {
    return {
      ...module,
      videosAmount: module.videos.length,
      classroom: module.classroom.title
    }
  })

  return (
    <>
      <div className="w-full flex gap-x-4">
        <NewClassroomModuleButton />
      </div>
      <Suspense fallback={<SkeletonDefault />}>
        <ClassroomModuleTable data={formattedData} />
      </Suspense>
    </>
  )
}

export default ModuleContent
