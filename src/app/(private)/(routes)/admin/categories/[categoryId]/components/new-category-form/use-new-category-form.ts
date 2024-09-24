import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Category } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required'
  })
})

type NewCategoryFormValues = z.infer<typeof formSchema>

type UseNewCategoryFormProps = {
  initialData: Category | null
}

export const useNewCategoryForm = ({
  initialData
}: UseNewCategoryFormProps) => {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const title = initialData ? 'Edit category' : 'Create category'
  const toastMessage = initialData
    ? 'Category updated.'
    : 'Category created successfully'
  const action = initialData ? 'Save changes' : 'Create category'

  const form = useForm<NewCategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? ''
    }
  })

  const { mutateAsync: deleteCategory, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      return await api.delete(`/api/category/${params.categoryId}`)
    },
    onSuccess: () => {
      router.push(appRoutes.admin_categories)
      router.refresh()
      toast({
        title: 'Success',
        description: 'Category deleted successfully.'
      })
    },
    onError: err => {
      console.log('Error deleting category', err)
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    }
  })

  const { mutateAsync: createOrUpdateCategory, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      if (initialData) {
        return await api.patch(`/api/category/${params.categoryId}`, data)
      }

      return await api.post(`/api/category`, data)
    },
    onSuccess: () => {
      router.push(appRoutes.admin_categories)
      router.refresh()
      toast({
        title: 'Success',
        description: `${toastMessage}`
      })
    },
    onError: err => {
      console.log('Error creating/updating user', err)
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    }
  })

  const onSubmit = async (values: NewCategoryFormValues) => {
    await createOrUpdateCategory(values)
  }

  const onDeleteCategory = async () => {
    try {
      await deleteCategory()
    } catch (error) {
      console.log('Error deleting category', error)
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
    onDeleteCategory,
    title,
    isPending,
    form,
    onSubmit,
    action
  }
}
