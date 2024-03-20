import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { type ClassroomModule } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required'
  }),
  classroomId: z.string().min(1, {
    message: 'Classroom is required'
  })
})

type NewClassroomModuleFormValues = z.infer<typeof formSchema>

type UseNewClassroomModuleFormProps = {
  initialData: ClassroomModule | null
}

export const useNewClassroomModuleForm = ({
  initialData
}: UseNewClassroomModuleFormProps) => {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const title = initialData ? 'Edit Module' : 'Create Module'
  const description = initialData ? 'Edit a Module' : 'Add a new Module.'
  const toastMessage = initialData
    ? 'Module updated.'
    : 'Module created successfully'
  const action = initialData ? 'Save changes' : 'Create Module'

  const form = useForm<NewClassroomModuleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title ?? '',
      classroomId: initialData?.classroomId ?? ''
    }
  })

  const { mutateAsync: deleteClassroomModule, isPending: isDeleting } =
    useMutation({
      mutationFn: async () => {
        return await api.delete(`/api/classroom/module/${params.moduleId}`)
      },
      onSuccess: () => {
        router.push(appRoutes.admin_classroom)
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
      mutationFn: async (data: z.infer<typeof formSchema>) => {
        if (initialData) {
          return await api.patch(
            `/api/classroom/module/${params.moduleId}`,
            data
          )
        }

        return await api.post(`/api/classroom/module`, data)
      },
      onSuccess: () => {
        router.push(appRoutes.admin_classroom)
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

  const onSubmit = async (values: NewClassroomModuleFormValues) => {
    await createOrUpdateClassroomModule(values)
  }

  const onDeleteClassroomModule = async () => {
    try {
      await deleteClassroomModule()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    } finally {
      setIsAlertModalOpen(false)
    }
  }
  return {
    isAlertModalOpen,
    setIsAlertModalOpen,
    title,
    description,
    action,
    form,
    isDeleting,
    isPending,
    onSubmit,
    onDeleteClassroomModule,
    router
  }
}
