'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { appRoutes } from '@/lib/constants'
import { useRouter } from 'next/navigation'

export const NewClassroomVideoButton = () => {
  const router = useRouter()

  return (
    <Button
      onClick={() => {
        router.push(appRoutes.admin_classroom_video_new)
      }}
      className="justify-end"
    >
      <Icons.plus className="w-4 h-4 mr-2" />
      New Video
    </Button>
  )
}
