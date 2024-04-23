import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type JSONContent } from 'novel'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import NoteEditor from '../editor/editor'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { toast } from '../ui/use-toast'

interface RichTextInputProps {
  videoId: string
  isCommentsLoading: boolean
}

const contentSchema = z.object({
  content: z.string().min(1)
})

export const RichTextInput = ({
  videoId,
  isCommentsLoading
}: RichTextInputProps) => {
  const queryClient = useQueryClient()
  const form = useForm({
    resolver: zodResolver(contentSchema),
    mode: 'onChange',
    defaultValues: {
      content: ''
    }
  })

  const { mutateAsync, isPending } = useMutation({
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
      toast({
        title: 'An error ocurred while posting comment',
        description: error.message,
        variant: 'destructive'
      })
    }
  })

  const onSubmit = useCallback(
    async (values: z.infer<typeof contentSchema>) => {
      await mutateAsync({
        videoId,
        content: values.content
      })
    },
    [mutateAsync, videoId]
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
      <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
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
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          className="self-end w-fit bg-slate-900 text-white gap-1 hover:bg-slate-900/70"
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
