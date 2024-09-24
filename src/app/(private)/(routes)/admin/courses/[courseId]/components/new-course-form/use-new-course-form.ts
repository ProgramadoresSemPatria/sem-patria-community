import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { type CourseCategory, type Course } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { type UseFormReturn, useForm } from 'react-hook-form'
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
  categoryIds: z.array(z.string()),
  categoryId: z.string()
})

type NewCourseFormValues = z.infer<typeof formSchema>
type Form = UseFormReturn<
  {
    name: string
    courseUrl: string
    isPaid: boolean
    level: string
    categoryIds: string[]
    categoryId: string
  },
  unknown,
  undefined
>

type UseNewCourseFormProps = {
  initialData:
    | (Course & {
        categories: CourseCategory[]
      })
    | null
}

export const useNewCourseForm = ({ initialData }: UseNewCourseFormProps) => {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>()

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
          categoryIds: [],
          categoryId: '',
          level: '',
          isPaid: false
        }
  })

  useEffect(() => {
    if (initialData) {
      const categories = [
        ...new Set([
          ...initialData.categories.map(category => category.categoryId)
        ])
      ]
      setSelectedCategory(initialData.categoryId)
      setSelectedCategories(categories)
      form.setValue('categoryIds', categories)
    }
  }, [form, initialData])

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
    onError: err => {
      console.log('Error deleting course', err)
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
    onError: err => {
      console.log('Error creating/updating course', err)
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    }
  })

  const onSubmit = async (values: NewCourseFormValues) => {
    await createOrUpdateCourse({ ...values, categoryIds: selectedCategories })
  }

  const onDeleteCourse = async () => {
    try {
      await deleteCourse()
    } catch (error) {
      console.log('Error deleting course', error)
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    } finally {
      setIsAlertModalOpen(false)
    }
  }

  const handleSelectedcategories = (category: string, form: Form) => {
    const newSelectedcategories = [...selectedCategories]
    const index = newSelectedcategories.indexOf(category)
    if (index > -1) {
      newSelectedcategories.splice(index, 1)
    } else {
      newSelectedcategories.push(category)
    }
    setSelectedCategories(newSelectedcategories)
    form.setValue('categoryIds', newSelectedcategories)
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
    action,
    selectedCategories,
    selectedCategory,
    setSelectedCategory,
    handleSelectedcategories
  }
}
