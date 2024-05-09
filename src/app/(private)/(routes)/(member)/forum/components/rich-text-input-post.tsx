import NoteEditor from '@/components/editor/editor'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { useCategory } from '@/hooks/category/use-category'
import useCreatePostModalStore from '@/hooks/modal/use-create-post'
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface RichTextInputProps {
  isCommentsLoading?: boolean
}

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

export const RichTextInput = ({ isCommentsLoading }: RichTextInputProps) => {
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
  const { onClose } = useCreatePostModalStore()

  const { mutateAsync: createPost, isPending } = useMutation({
    mutationKey: ['post'],
    mutationFn: async ({
      content,
      title,
      categoryId
    }: {
      categoryId: string
      title: string
      content: string
    }) => {
      return await api.post(`/api/post`, {
        content,
        categoryId,
        title
      })
    },
    onSuccess: async () => {
      onClose()
    },

    onError: error => {
      toast({
        title: 'An error ocurred while creating post',
        description: error.message,
        variant: 'destructive'
      })
    }
  })

  const onSubmit = useCallback(
    async (values: z.infer<typeof contentSchema>) => {
      if (values.categoryIdForm && values.content && values.title)
        await createPost({
          categoryId: values.categoryIdForm,
          title: values.title,
          content: values.content
        })
      await queryClient.refetchQueries({
        queryKey: ['infinite-posts', { category: searchParams.get('category') }]
      })
    },
    [createPost, queryClient, searchParams]
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
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Title..."
                  onChange={field.onChange}
                  content={field.value}
                  disabled={form.formState.isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <div className="max-h-[300px] overflow-y-auto rounded-md">
                  <NoteEditor
                    onChange={field.onChange}
                    hasToolbar
                    variant="postInput"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          className="self-end w-fit bg-slate-800 text-white gap-1 hover:bg-slate-900"
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
