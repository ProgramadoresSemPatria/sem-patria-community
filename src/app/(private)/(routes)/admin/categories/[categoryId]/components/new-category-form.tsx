'use client'

import Header from '@/components/header'
import { Icons } from '@/components/icons'
import { AlertModal } from '@/components/modals/alert-modal'
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
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Category } from '@prisma/client'
import { Icon } from '@radix-ui/react-select'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

type NewCategoryFormProps = {
  initialData: Category | null
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required'
  })
})

type NewCategoryFormValues = z.infer<typeof formSchema>

export const NewCategoryForm = ({ initialData }: NewCategoryFormProps) => {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const title = initialData ? 'Edit category' : 'Create category'
  const description = initialData ? 'Edit a category' : 'Add a new category.'
  const toastMessage = initialData
    ? 'Category updated.'
    : 'Category created successfully'
  const action = initialData ? 'Save changes' : 'Create category'

  const form = useForm<NewCategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? ''
    }
  })

  const { mutateAsync: deleteCategory, isPending: isDeleting } = useMutation({
    mutationFn: () => {
      return api.delete(`/api/categories/${params.categoryId}`)
    },
    onSuccess: () => {
      router.push(appRoutes.admin_categories)
      router.refresh()
      toast({
        title: 'Success',
        description: 'Category deleted successfully.'
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    }
  })

  const { mutateAsync: createOrUpdateCategory, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      if (initialData) {
        return api.patch(`/api/categories/${params.categoryId}`, data)
      }

      return api.post(`/api/categories`, data)
    },
    onSuccess: () => {
      router.push(appRoutes.admin_categories)
      router.refresh()
      toast({
        title: 'Success',
        description: `${toastMessage}`
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    }
  })

  const onSubmit = async (values: NewCategoryFormValues) => {
    await createOrUpdateCategory(values)
  }

  const onDeleteCategory = async () => {
    try {
      await deleteCategory()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    } finally {
      setIsAlertModalOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={isAlertModalOpen}
        loading={isDeleting}
        onClose={() => setIsAlertModalOpen(false)}
        onConfirm={() => onDeleteCategory()}
      />
      <div className="flex flex-col">
        <Button
          size="icon"
          variant="link"
          onClick={() => router.push(appRoutes.admin_categories)}
          className="font-medium w-fit"
        >
          <Icons.arrowBack className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="flex items-center justify-between">
          <Header title={title} description={description} />
          {initialData && (
            <Button
              disabled={isPending}
              variant="destructive"
              size="icon"
              onClick={() => setIsAlertModalOpen(true)}
            >
              <Icons.trash className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Separator className="my-6" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="grid grid-cols-3 gap-8">
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
            <Button disabled={isPending} className="ml-auto" type="submit">
              {isPending && (
                <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              {action}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
