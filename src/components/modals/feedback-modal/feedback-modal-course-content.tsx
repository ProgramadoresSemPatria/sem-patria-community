import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Category } from '@prisma/client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

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
  }),
  isPending: z.boolean().default(true)
})

type FeedbackModalCourseContentFormValues = z.infer<typeof formSchema>

type FeedbackModalCourseContentProps = {
  handleSetSelectValue: (value: string) => void
  onClose: () => void
}

export const FeedbackModalCourseContent = ({
  handleSetSelectValue,
  onClose
}: FeedbackModalCourseContentProps) => {
  const { data: categories, isLoading: isLoadingCategories } = useQuery<
    Category[]
  >({
    queryKey: ['categories'],
    queryFn: async () => (await api.get(`/api/categories`)).data
  })

  const form = useForm<FeedbackModalCourseContentFormValues>({
    resolver: zodResolver(formSchema)
  })

  const { mutateAsync: createCourse, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return await api.post(`/api/courses`, data)
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Course created successfully.'
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

  const onSubmit = async (values: FeedbackModalCourseContentFormValues) =>
    await createCourse(values)

  const checkIfCategoryExists = () => {
    if (isLoadingCategories)
      return <Icons.loader className="w-6 h-6 animate-spin" />

    if (!categories || categories.length < 1)
      return (
        <div className="flex flex-col gap-y-2">
          <span className="text-muted-foreground font-medium text-sm">
            You must create a category before create a course.
          </span>
          <Button
            variant="outline"
            size="sm"
            className="w-1/3"
            onClick={() => {
              handleSetSelectValue('category')
            }}
          >
            Create category
          </Button>
        </div>
      )

    return null
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Course name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between gap-x-8">
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Levels</FormLabel>
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
                          placeholder="Select a level"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <>
                  <FormItem className="w-full">
                    <FormLabel>Category</FormLabel>
                    {checkIfCategoryExists() ?? (
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
                    )}
                  </FormItem>
                </>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="courseUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Url</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Course Url"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isPaid"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Paid</FormLabel>
                  <FormDescription>
                    Inform if this course is paid or not.
                  </FormDescription>
                </div>
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
          <Button
            disabled={isPending || !categories || isLoadingCategories}
            type="submit"
          >
            {isPending && (
              <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create course
          </Button>
        </div>
      </form>
    </Form>
  )
}
