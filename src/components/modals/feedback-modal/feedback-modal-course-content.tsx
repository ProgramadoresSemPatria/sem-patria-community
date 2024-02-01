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
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'
import { useCategory } from '@/hooks/category/use-category'
import { useCourse } from '@/hooks/course/use-course'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { useState } from 'react'
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
  categoryId: z.string().optional(),
  categoryName: z.string().optional(),
  isPending: z.boolean().default(true)
})

type FeedbackModalCourseContentFormValues = z.infer<typeof formSchema>

type FeedbackModalCourseContentProps = {
  onClose: () => void
}

export const FeedbackModalCourseContent = ({
  onClose
}: FeedbackModalCourseContentProps) => {
  const router = useRouter()
  const { categories, isLoadingCategories } = useCategory()
  const { useCreateCourse } = useCourse()
  const [isNewCategory, setIsNewCategory] = useState(false)

  const form = useForm<FeedbackModalCourseContentFormValues>({
    resolver: zodResolver(formSchema)
  })

  const { mutateAsync: createCourse, isPending } = useCreateCourse({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Course created successfully.'
      })
      onClose()
      router.refresh()
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    }
  })

  const onSubmit = async (values: FeedbackModalCourseContentFormValues) => {
    const categoriesList = categories ?? []
    if (categoriesList.length < 1 && !values.categoryName) {
      toast({
        title: 'Attention',
        description: 'You need to create a category to create a course.',
        variant: 'default'
      })
      return
    }

    if (categoriesList.length > 0 && !values.categoryId && !isNewCategory) {
      toast({
        title: 'Attention',
        description: 'You need to select a category to create a course.',
        variant: 'default'
      })
      return
    }

    await createCourse(values)
  }
  const handleCategoryInput = () => {
    if (isLoadingCategories)
      return <Icons.loader className="w-6 h-6 animate-spin" />

    if (!categories || categories.length < 1)
      return (
        <FormField
          control={form.control}
          name="categoryName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="New category name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )

    return (
      <>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <Label>Create a new category</Label>
            <span className="flex flex-wrap font-medium text-muted-foreground text-sm">
              Allow this option if there is no category for this course.
            </span>
            <span className="flex flex-wrap pt-1 text-slate-300 font-normal text-xs">
              The category will only appear when the course has been approved.
            </span>
          </div>
          <Switch
            checked={isNewCategory}
            onCheckedChange={() => {
              setIsNewCategory(prev => !prev)
            }}
          />
        </div>

        {isNewCategory ? (
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="New category name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <>
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
              </>
            )}
          />
        )}
      </>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-6 mt-4">
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
            name="isPaid"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded-md border p-4 w-full">
                <div className="space-y-1 leading-none">
                  <FormLabel>Course Paid</FormLabel>
                  <FormDescription>
                    Inform if this course is paid or not.
                  </FormDescription>
                </div>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {handleCategoryInput()}
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
            Create recommendation
          </Button>
        </div>
      </form>
    </Form>
  )
}
