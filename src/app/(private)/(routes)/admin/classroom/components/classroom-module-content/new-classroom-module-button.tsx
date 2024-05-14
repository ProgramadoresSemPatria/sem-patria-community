'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Can } from '@/hooks/use-ability'
import { appRoutes } from '@/lib/constants'
import { useRouter } from 'next/navigation'

export const NewClassroomModuleButton = () => {
  const router = useRouter()

  return (
    <Can I="create" a="Classroom">
      <Button
        onClick={() => {
          router.push(appRoutes.admin_classroom_module_new)
        }}
        className="justify-end"
      >
        <Icons.plus className="w-4 h-4 mr-2" />
        New Module
      </Button>
    </Can>
  )
}
