'use client'
import { Icons } from '@/components/icons'
import { NoContent } from '@/components/no-content'
import { SkeletonMentorshipPage } from '@/components/skeletons/skeleton-mentorship-page'
import { type Video } from '@prisma/client'
import { Suspense, useEffect, useState } from 'react'
import { ModuleCarousel } from '../module-carousel'
import { Reorder } from 'framer-motion'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { useAbility } from '@casl/react'
import { AbilityContext } from '@/hooks/use-ability'

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
  const ability = useAbility(AbilityContext)
  const canManageClassroom = ability.can('manage', 'Classroom')
  const [items, setItems] = useState(data)
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const orderChanged =
      JSON.stringify(items.map(i => i.id)) !==
      JSON.stringify(data.map(i => i.id))

    setHasChanges(orderChanged)
  }, [data, items])

  const saveOrder = async () => {
    setIsSaving(true)
    try {
      await api.patch('/api/classroom/', {
        items: items.map((item, index) => ({
          id: item.id,
          order: index
        }))
      })
      setHasChanges(false)
    } catch (error) {
      console.error('Failed to save order:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleAutoScroll = (info: { point: { x: number; y: number } }) => {
    const threshold = 400
    const scrollSpeed = 15
    const relativeY = info.point.y - window.scrollY

    if (relativeY < threshold) {
      window.scrollBy(0, -scrollSpeed)
    } else if (window.innerHeight - relativeY < threshold) {
      window.scrollBy(0, scrollSpeed)
    }
  }

  return (
    <div className="flex flex-col gap-y-10">
      <Suspense fallback={<SkeletonMentorshipPage />}>
        {hasChanges && (
          <div className="flex justify-end mb-4">
            <Button variant="default" onClick={saveOrder} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Icons.loader className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Icons.save className="h-4 w-4" />
                  Save Order
                </>
              )}
            </Button>
          </div>
        )}
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
              className={`relative flex flex-col gap-y-3 ${
                canManageClassroom ? 'cursor-grab' : ''
              }`}
              drag={canManageClassroom}
              onDrag={(_, info) => {
                handleAutoScroll(info)
              }}
            >
              <div className="flex items-center justify-between w-full">
                <h2 className="font-medium text-lg flex items-center">
                  {canManageClassroom && <Icons.grip className="cursor-grab" />}{' '}
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
