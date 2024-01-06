import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required'
  }),
  isPending: z.boolean().default(true)
})

type FeedbackModalCategoryContentFormValues = z.infer<typeof formSchema>

type FeedbackModalCategoryContentProps = {
  onClose: () => void
}

export const FeedbackModalCategoryContent = ({
  onClose
}: FeedbackModalCategoryContentProps) => {
  const form = useForm<FeedbackModalCategoryContentFormValues>({
    resolver: zodResolver(formSchema)
  })

  const { mutateAsync: createCategory, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return await api.post(`/api/categories`, data)
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Category created successfully.'
      })
      onClose()
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    }
  })

  const onSubmit = async (values: FeedbackModalCategoryContentFormValues) =>
    await createCategory(values)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Category name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center w-full mt-8 gap-x-4">
          <Button
            variant="secondary"
            className="ml-auto"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button disabled={isPending} type="submit">
            {isPending && (
              <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create category
          </Button>
        </div>
      </form>
    </Form>
  )
}
