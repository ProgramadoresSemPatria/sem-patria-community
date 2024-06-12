'use client'

import { type classroomModuleFormSchema } from '@/app/(private)/(routes)/admin/classroom/(routes)/module/[moduleId]/components/new-classroom-module-form/use-new-classroom-module-form'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { type ClassroomModule } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { type z } from 'zod'

type UseModuleServiceProps = {
  initialData?: ClassroomModule | null
}

export const useModuleService = ({ initialData }: UseModuleServiceProps) => {
  const router = useRouter()
  const params = useParams()

  const toastMessage = initialData
    ? 'Module updated.'
    : 'Module created successfully'

  const { mutateAsync: deleteClassroomModule, isPending: isDeletingModule } =
    useMutation({
      mutationFn: async () => {
        return await api.delete(`/api/classroom/module/${params.moduleId}`)
      },
      onSuccess: () => {
        router.push(`${appRoutes.admin_classroom}?tabSelected=modules`)
        router.refresh()
        toast({
          title: 'Success',
          description: 'Module deleted successfully.'
        })
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'Something went wrong.',
          variant: 'destructive'
        })
      }
    })

  const { mutateAsync: createOrUpdateClassroomModule, isPending } = useMutation(
    {
      mutationFn: async (data: z.infer<typeof classroomModuleFormSchema>) => {
        if (initialData) {
          return await api.patch(
            `/api/classroom/module/${params.moduleId}`,
            data
          )
        }

        return await api.post(`/api/classroom/module`, data)
      },
      onSuccess: () => {
        router.push(`${appRoutes.admin_classroom}?tabSelected=modules`)
        router.refresh()
        toast({
          title: 'Success',
          description: `${toastMessage}`
        })
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'Something went wrong.',
          variant: 'destructive'
        })
      }
    }
  )

  const {
    mutate: deleteImageModule,
    isPending: isDeletingImageModule,
    isSuccess: isImageDeleted
  } = useMutation({
    mutationFn: async (imageKey: string) => {
      return await api.post(`/api/uploadthing/delete`, { imageKey })
    }
  })

  return {
    deleteClassroomModule,
    isDeletingModule,
    createOrUpdateClassroomModule,
    isPending,
    deleteImageModule,
    isDeletingImageModule,
    isImageDeleted
  }
}
