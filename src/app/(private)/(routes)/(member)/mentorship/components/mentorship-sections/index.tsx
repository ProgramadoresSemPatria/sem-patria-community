'use client'
import { Icons } from '@/components/icons'
import { NoContent } from '@/components/no-content'
import { SkeletonMentorshipPage } from '@/components/skeletons/skeleton-mentorship-page'
import { type Video } from '@prisma/client'
import { Suspense, useEffect, useState } from 'react'
import { ModuleCarousel } from '../module-carousel'
import { Reorder } from 'framer-motion'
import { api } from '@/lib/api'

interface FormattedModule {
  id: string
  title: string
  fileUrl?: string
  classroomId: string
  videos: Video[]
  isPrePspAllowed?: boolean
}
interface FormattedClassroom {
  id: string
  title: string
  modules: FormattedModule[]
  hasPermission: boolean
}
export const MentorshipSections = ({
  data
}: {
  data: FormattedClassroom[]
}) => {
  const [items, setItems] = useState(data)
  useEffect(() => {
    const updateOrder = async () => {
      await api.patch('/api/classroom/', {
        items: items.map((item, index) => ({
          id: item.id,
          order: index
        }))
      })
    }
    if (
      JSON.stringify(items.map(i => i.id)) !==
      JSON.stringify(data.map(i => i.id))
    ) {
      void updateOrder()
    }
  }, [data, items])

  return (
    <div className="flex flex-col gap-y-10">
      <Suspense fallback={<SkeletonMentorshipPage />}>
        {!items.length && (
          <NoContent
            title="No classrooms created yet."
            description="Try contacting an admin to add new content."
          />
        )}
        <Reorder.Group
          axis="y"
          values={items}
          onReorder={setItems}
          className="flex flex-col gap-y-10"
        >
          {items.map(classroom => (
            <Reorder.Item
              key={classroom.id}
              value={classroom}
              className="relative flex flex-col gap-y-3 cursor-grab"
            >
              <div className="flex items-center justify-between w-full cursor-move">
                <h2 className="font-medium text-lg flex items-center">
                  <Icons.grip className="ml-auto size-4 cursor-grab" />
                  {classroom.title}

                  {!classroom.hasPermission && (
                    <Icons.lock className="h-4 w-4 ml-2" />
                  )}
                </h2>
              </div>
              <ModuleCarousel
                modules={classroom.modules}
                hasPermission={classroom.hasPermission}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </Suspense>
    </div>
  )
}
