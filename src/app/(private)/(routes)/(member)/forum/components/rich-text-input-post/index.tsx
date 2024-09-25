import NoteEditor from '@/components/editor/editor'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useMutationState } from '@tanstack/react-query'
import { useRichTextInputPost } from './use-rich-text-input-post'

type RichTextInputProps = {
  isCommentsLoading?: boolean
}

export const RichTextInput = ({ isCommentsLoading }: RichTextInputProps) => {
  const { form, onSubmit, isPending, categories } = useRichTextInputPost()
  const isUploadingImage =
    useMutationState({
      filters: { mutationKey: ['editor-upload-file'], status: 'pending' },
      select: mutation => mutation.state.status
    }).length > 0

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
                  <SelectTrigger data-testid="category">
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
                      <SelectItem
                        data-testid={category.name}
                        key={category.id}
                        value={category.id}
                      >
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
                  data-testid="title"
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={
            !form.formState.isValid ||
            form.formState.isSubmitting ||
            isPending ||
            isUploadingImage
          }
          className="self-end w-fit dark:bg-slate-800 bg-slate-200 dark:text-white text-black gap-1 dark:hover:bg-slate-900 hover:bg-slate-100"
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
