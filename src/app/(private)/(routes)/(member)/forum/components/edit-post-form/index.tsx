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
import { type JsonValue } from '@prisma/client/runtime/library'
import { useMutationState } from '@tanstack/react-query'
import { useEditPostForm } from './use-edit-post-form'

interface EditPostFormProps {
  postId: string
  initialValues: {
    title: string
    content: JsonValue
    categoryId: string
  }
}

export const EditPostForm = ({ postId, initialValues }: EditPostFormProps) => {
  const { form, onSubmit, isPending, categories, isFormUpdated } =
    useEditPostForm({
      postId,
      initialValues: {
        title: initialValues.title,
        content: initialValues.content as string,
        categoryId: initialValues.categoryId
      }
    })
  const isUploadingImage =
    useMutationState({
      filters: { mutationKey: ['editor-upload-file'], status: 'pending' },
      select: mutation => mutation.state.status
    }).length > 0

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="categoryId"
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
                  defaultValue={initialValues.title}
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
                    initialValue={JSON.parse(initialValues.content as string)}
                    onChange={value => {
                      field.onChange(value)
                    }}
                    editable
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
          disabled={
            !isFormUpdated ||
            !form.formState.isValid ||
            form.formState.isSubmitting ||
            isPending ||
            isUploadingImage
          }
          className="self-end w-fit dark:bg-slate-800 bg-slate-200 dark:text-white text-black gap-1 dark:hover:bg-slate-900 hover:bg-slate-100"
        >
          {isPending ? (
            <>
              <Icons.loader className="h-4 w-4 mr-2 animate-spin" /> Updating
            </>
          ) : (
            <>
              <Icons.edit className="w-4 h-4" /> Update
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
