import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { RichTextEditor } from './rich-text-editor'

const contentSchema = z.object({
  content: z.string()
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
      </form>
    </Form>
  )
}
