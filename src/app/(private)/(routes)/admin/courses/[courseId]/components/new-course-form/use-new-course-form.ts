import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Course } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required'
  }),
  courseUrl: z
    .string()
    .url({
      message: 'Invalid url'
    })
    .min(1, {
      message: 'Url is required'
    }),
  isPaid: z.boolean().default(false),
  level: z.string().min(1, {
    message: 'Level is required'
  }),
  categoryId: z.string().min(1, {
    message: 'Category is required'
  })
})

type NewCourseFormValues = z.infer<typeof formSchema>

type UseNewCourseFormProps = {
  initialData: Course | null
}

export const useNewCourseForm = ({ initialData }: UseNewCourseFormProps) => {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const title = initialData ? 'Edit course' : 'Create course'
  const toastMessage = initialData
    ? 'Course updated.'
    : 'Course created successfully'
  const action = initialData ? 'Save changes' : 'Create course'

  const form = useForm<NewCourseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData
        }
      : {
          name: '',
          courseUrl: '',
          categoryId: '',
          level: '',
          isPaid: false
        }
  })

  const { mutateAsync: deleteCourse, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      return await api.delete(`/api/course/${params.courseId}`)
    },
    onSuccess: () => {
      router.push(appRoutes.admin_courses)
      router.refresh()
      toast({
        title: 'Success',
        description: 'Course deleted successfully.'
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

  const { mutateAsync: createOrUpdateCourse, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      if (initialData) {
        return await api.patch(`/api/course/${params.courseId}`, data)
      }

      return await api.post(`/api/course`, data)
    },
    onSuccess: () => {
      router.push(appRoutes.admin_courses)
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

  const onSubmit = async (values: NewCourseFormValues) => {
    await createOrUpdateCourse(values)
  }

  const onDeleteCourse = async () => {
    try {
      await deleteCourse()
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
    isDeleting,
    setIsAlertModalOpen,
    onDeleteCourse,
    router,
    title,
    isPending,
    form,
    onSubmit,
    action
  }
}
