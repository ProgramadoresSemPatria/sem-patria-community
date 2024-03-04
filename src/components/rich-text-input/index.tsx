import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import { RichTextEditor } from './rich-text-editor'

const contentSchema = z.object({
  content: z.string().min(1)
})

export const RichTextInput = () => {
  const form = useForm({
    resolver: zodResolver(contentSchema),
    mode: 'onChange',
    defaultValues: {
      content: ''
    }
  })

  function onSubmit(values: z.infer<typeof contentSchema>) {
    console.log(values.content)
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
                <RichTextEditor
                  onChange={field.onChange}
                  content={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          className="self-end w-fit bg-slate-800 text-white gap-1 hover:bg-slate-900"
        >
          <Icons.send className="w-4 h-4" /> Send
        </Button>
      </form>
    </Form>
  )
}
