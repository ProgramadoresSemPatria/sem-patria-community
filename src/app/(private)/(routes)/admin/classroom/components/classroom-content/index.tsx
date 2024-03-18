import { SkeletonDefault } from '@/components/skeletons/skeleton-default'
import prismadb from '@/lib/prismadb'
import { Suspense } from 'react'
import { ClassroomTable } from './classroom-table'
import { type ClassroomColumn } from './columns'
import { NewClassroomButton } from './new-classroom-button'
import { NewClassroomModuleButton } from './new-classroom-module-button'

const ClassroomContent = async () => {
  const data = await prismadb.classroom.findMany({
    include: {
      modules: true
    }
  })

  const formattedData: ClassroomColumn[] = data.map(classroom => {
    return {
      ...classroom,
      modules: classroom.modules
    }
  })

  return (
    <>
      <div className="w-full flex gap-x-4">
        <NewClassroomButton />
        <NewClassroomModuleButton />
      </div>
      <Suspense fallback={<SkeletonDefault />}>
        <ClassroomTable data={formattedData} />
      </Suspense>
    </>
  )
}

export default ClassroomContent
