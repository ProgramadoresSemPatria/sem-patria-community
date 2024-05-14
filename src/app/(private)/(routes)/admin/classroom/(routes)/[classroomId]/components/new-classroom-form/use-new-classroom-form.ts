import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Roles, type Classroom } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
      router.push(appRoutes.admin_classroom)
      router.refresh()
      toast({
        title: 'Success',
        description: 'Classroom deleted successfully.'
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

  const { mutateAsync: createOrUpdateClassroom, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      if (initialData) {
        return await api.patch(`/api/classroom/${params.classroomId}`, data)
      }

      return await api.post(`/api/classroom`, data)
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

  const { Admin, Builder, ...roles } = Roles

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
    roles
  }
}
