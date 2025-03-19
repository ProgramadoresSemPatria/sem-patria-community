import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Roles, type Classroom, type ClassroomModule } from '@prisma/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type ClassroomWithModules = {
  data: Classroom & {
    modules: ClassroomModule[]
  }
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required'
  }),
  permissions: z.string().array().nonempty({
    message: 'Please select a permission.'
  })
})

type NewClassroomFormValues = z.infer<typeof formSchema>

type UseNewClassroomFormProps = {
  initialData: Classroom | null
}

export const useNewClassroomForm = ({
  initialData
}: UseNewClassroomFormProps) => {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)
  const [classroomModules, setClassroomModules] = useState<ClassroomModule[]>(
    []
  )

  const title = initialData ? 'Edit Classroom' : 'Create Classroom'
  const toastMessage = initialData
    ? 'Classroom updated.'
    : 'Classroom created successfully'
  const action = initialData ? 'Save changes' : 'Create Classroom'

  const form = useForm<NewClassroomFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title ?? '',
      permissions: initialData?.permissions ?? []
    }
  })

  const { mutateAsync: deleteClassroom, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      return await api.delete(`/api/classroom/${params.classroomId}`)
    },
    onSuccess: () => {
      router.push(`${appRoutes.admin_classroom}?tabSelected=classroom`)
      router.refresh()
      toast({
        title: 'Success',
        description: 'Classroom deleted successfully.'
      })
    },
    onError: err => {
      console.error('Error deleting classroom', err)
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    }
  })

  const { mutateAsync: createOrUpdateClassroom, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      if (initialData) {
        return await api.patch(`/api/classroom/${params.classroomId}`, data)
      }

      return await api.post(`/api/classroom`, data)
    },
    onSuccess: () => {
      router.push(`${appRoutes.admin_classroom}?tabSelected=classroom`)
      router.refresh()
      toast({
        title: 'Success',
        description: `${toastMessage}`
      })
    },
    onError: err => {
      console.error('Error creating/updating classroom', err)
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    }
  })

  const { data: classroomData, isLoading: isLoadingClassroom } =
    useQuery<ClassroomWithModules>({
      queryKey: ['getClassroom', params.classroomId],
      queryFn: async () => {
        return await api.get(`/api/classroom/${params.classroomId}`)
      },
      enabled: !!params.classroomId
    })

  const onSubmit = async (values: NewClassroomFormValues) => {
    values.permissions.push(Roles.Admin)
    await createOrUpdateClassroom(values)
  }

  const onDeleteClassroom = async () => {
    try {
      await deleteClassroom()
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

  const { mutateAsync: saveOrder, isPending: isSavingOrder } = useMutation({
    mutationKey: ['update-order-module-classroom'],
    mutationFn: async (
      orderedModules: Array<{ id: string; order: number }>
    ) => {
      await api.patch(`/api/classroom/module`, {
        order: orderedModules
      })
    },
    onSuccess: async () => {
      toast({
        title: 'The order was updated succesfully'
      })
    },
    onError: err => {
      console.error('Error ordering modules', err)
      toast({
        title: 'An error occurred while ordering modules'
      })
    }
  })

  async function handleSaveOrder(modules: ClassroomModule[]) {
    const orderedModules = modules.map((module, index) => ({
      id: module.id,
      order: index
    }))

    try {
      await saveOrder(orderedModules)
    } catch (error) {
      console.error('Failed to save order:', error)
    }
  }

  const { Admin, ...roles } = Roles

  useEffect(() => {
    if (classroomData?.data.modules)
      setClassroomModules(classroomData.data.modules)
  }, [classroomData])

  return {
    isAlertModalOpen,
    isDeleting,
    setIsAlertModalOpen,
    onDeleteClassroom,
    title,
    isPending,
    form,
    onSubmit,
    action,
    roles,
    classroomModules,
    setClassroomModules,
    handleSaveOrder,
    isLoadingClassroom,
    isSavingOrder
  }
}
