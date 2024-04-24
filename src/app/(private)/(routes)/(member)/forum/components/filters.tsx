'use client'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useCategory } from '@/hooks/category/use-category'
import useFiltersModalStore from '@/hooks/modal/use-filters-modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const contentSchema = z.object({
  orderBy: z.string(),
  category: z.string()
})

const ForumFilters = () => {
  const { onClose } = useFiltersModalStore()
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(contentSchema),
    mode: 'onChange',
    defaultValues: {
      orderBy: '',
      category: ''
    }
  })
  const { categories } = useCategory()

  const categoryOptions =
    categories && categories.length > 0
      ? [
          {
            id: 'all',
            name: 'All'
          },
          ...categories
        ]
      : []

  const onSubmit = () => {
    router.push(
      `/forum?category=${form.getValues().category}${
        form.getValues().orderBy ? `&orderBy=${form.getValues().orderBy}` : ''
      }`
    )
    onClose()
  }
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Category</FormLabel>
              <Select
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
                  {categoryOptions &&
                    categoryOptions.length > 0 &&
                    categoryOptions.map(category => (
                      <SelectItem key={category.id} value={category.name}>
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
          name="orderBy"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>OrderBy</FormLabel>
              <Select
                // disabled={isPending}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      defaultValue={field.value}
                      placeholder="Order by"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="likes">Most likes</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          className="self-end w-fit bg-slate-800 text-white gap-1 hover:bg-slate-900"
        >
          Apply filters
        </Button>
      </form>
    </Form>
  )
}

export default ForumFilters
