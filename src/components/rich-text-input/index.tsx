import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { useCategory } from '@/hooks/category/use-category'
import useCreatePostModalStore from '@/hooks/modal/use-create-post'
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useMutation,
  useMutationState,
  useQueryClient
} from '@tanstack/react-query'
import { type JSONContent } from 'novel'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import NoteEditor from '../editor/editor'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { Skeleton } from '../ui/skeleton'
import { toast } from '../ui/use-toast'

interface RichTextInputProps {
  videoId?: string
  categoryId?: string
  isCommentsLoading?: boolean
}

const contentSchema = z.object({
  content: z.string().min(1),
  categoryIdForm: z.string()
})

export const RichTextInput = ({
  videoId,
  categoryId,
  isCommentsLoading
}: RichTextInputProps) => {
  const queryClient = useQueryClient()
  const form = useForm({
    resolver: zodResolver(contentSchema),
    mode: 'onChange',
    defaultValues: {
      content: '',
      categoryIdForm: ''
    }
  })
  const { categories } = useCategory()
  const { onClose } = useCreatePostModalStore()
  const isUploadingImage =
    useMutationState({
      filters: { mutationKey: ['editor-upload-file'], status: 'pending' },
      select: mutation => mutation.state.status
    }).length > 0

  const { mutateAsync: createPost, isPending } = useMutation({
    mutationKey: ['post'],
    mutationFn: async ({
      content,
      categoryId
    }: {
      categoryId: string
      content: string
    }) => {
      return await api.post(`/api/post`, {
        content,
        categoryId
      })
    },
    onSuccess: async () => {
      form.setValue('content', '')
      await queryClient.invalidateQueries({ queryKey: ['post'] })
      onClose()
    },
    onError: error => {
      console.error('Error creating post', error)
      toast({
        title: 'An error ocurred while creating post',
        description: error.message,
        variant: 'destructive'
      })
    }
  })

  const { mutateAsync: createVideoComment } = useMutation({
    mutationKey: ['post-comment'],
    mutationFn: async ({
      videoId,
      content
    }: {
      videoId: string
      content: string
    }) => {
      return await api.post(`/api/comment/${videoId}`, {
        content
      })
    },
    onSuccess: async () => {
      form.setValue('content', '')
      await queryClient.invalidateQueries({ queryKey: ['video-comments'] })
    },
    onError: error => {
      console.error('Error creating comment on video', error)
      toast({
        title: 'An error ocurred while posting comment',
        description: error.message,
        variant: 'destructive'
      })
    }
  })

  const onSubmit = useCallback(
    async (values: z.infer<typeof contentSchema>) => {
      if (videoId)
        await createVideoComment({
          videoId,
          content: values.content
        })
      if (categoryId || values.categoryIdForm)
        await createPost({
          categoryId: categoryId || values.categoryIdForm,
          content: values.content
        })
    },
    [categoryId, createPost, createVideoComment, videoId]
  )

  if (isCommentsLoading) {
    return (
      <div className="flex flex-col items-end gap-2 mb-2">
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-24 h-10" />
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {!categoryId && !videoId && (
          <FormField
            control={form.control}
            name="categoryIdForm"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a category"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories &&
                      categories.length > 0 &&
                      categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <NoteEditor
                  initialValue={field.value as unknown as JSONContent}
                  onChange={field.onChange}
                  isSubmitting={form.formState.isSubmitting}
                  hasToolbar
                  variant="videoCommentInput"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={
            !form.formState.isValid ||
            form.formState.isSubmitting ||
            isUploadingImage
          }
          className="self-end w-fit text-white gap-1"
        >
          {isPending ? (
            <>
              <Icons.loader className="h-4 w-4 mr-2 animate-spin" /> Sending
            </>
          ) : (
            <>
              <Icons.send className="w-4 h-4" /> Send
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
