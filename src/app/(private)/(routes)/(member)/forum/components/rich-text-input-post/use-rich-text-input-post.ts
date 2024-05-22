import { useCategory } from '@/hooks/category/use-category'
import useCreatePostModalStore from '@/hooks/modal/use-create-post'
import { usePost } from '@/hooks/post/use-post'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const contentSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required'
  }),
  content: z.string().min(1, {
    message: 'Content is required'
  }),
  categoryIdForm: z.string().min(1, {
    message: 'Category ID is required'
  })
})

export const useRichTextInputPost = () => {
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()

  const form = useForm({
    resolver: zodResolver(contentSchema),
    mode: 'onChange',
    defaultValues: {
      content: '',
      title: '',
      categoryIdForm: ''
    }
  })
  const { categories } = useCategory()
  const {
    onCreatePost,
    isSuccessOnCreatePost,
    isCreatingPost: isPending
  } = usePost({})
  const { onClose } = useCreatePostModalStore()

  useEffect(() => {
    if (isSuccessOnCreatePost) {
      onClose()
    }
  }, [isSuccessOnCreatePost, onClose])

  const onSubmit = useCallback(
    async (values: z.infer<typeof contentSchema>) => {
      if (values.categoryIdForm && values.content && values.title)
        await onCreatePost({
          categoryId: values.categoryIdForm,
          title: values.title,
          content: values.content
        })
      await queryClient.refetchQueries({
        queryKey: ['infinite-posts', { category: searchParams.get('category') }]
      })
    },
    [onCreatePost, queryClient, searchParams]
  )
  return { categories, onSubmit, form, isPending }
}
