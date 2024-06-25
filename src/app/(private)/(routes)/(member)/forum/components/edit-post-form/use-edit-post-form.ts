import { useCategory } from '@/hooks/category/use-category'
import useEditPostModalStore from '@/hooks/modal/use-edit-post'
import { usePost } from '@/hooks/post/use-post'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const contentSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required'
  }),
  content: z.string().min(1, {
    message: 'Content is required'
  }),
  categoryId: z.string().min(1, {
    message: 'Category ID is required'
  })
})

export interface UseEditPostFormProps {
  postId: string
  initialValues: z.infer<typeof contentSchema>
}

export const useEditPostForm = ({
  postId,
  initialValues
}: UseEditPostFormProps) => {
  const form = useForm({
    resolver: zodResolver(contentSchema),
    mode: 'onChange',
    values: {
      content: initialValues.content,
      title: initialValues.title,
      categoryId: initialValues.categoryId
    }
  })
  const { categories } = useCategory()
  const {
    onUpdatePost,
    isSuccessOnUpdatePost,
    isUpdatingPost: isPending
  } = usePost({})
  const { onClose } = useEditPostModalStore()

  useEffect(() => {
    if (isSuccessOnUpdatePost) {
      onClose()
      window.location.reload()
    }
  }, [isSuccessOnUpdatePost, onClose])

  const onSubmit = useCallback(
    async (values: z.infer<typeof contentSchema>) => {
      await onUpdatePost({
        postId,
        categoryId: values.categoryId,
        title: values.title,
        content: values.content
      })
    },
    [onUpdatePost, postId]
  )

  const currentValues = form.watch()

  const isFormUpdated = useMemo(() => {
    return (
      currentValues.title !== initialValues.title ||
      currentValues.content !== initialValues.content ||
      currentValues.categoryId !== initialValues.categoryId
    )
  }, [currentValues, initialValues])

  return { categories, onSubmit, form, isPending, isFormUpdated }
}
