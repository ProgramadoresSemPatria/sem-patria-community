'use client'

import BackButton from '@/components/back-button'
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
import { appRoutes } from '@/lib/constants'
import { type Category } from '@prisma/client'
import { useNewCategoryForm } from './use-new-category-form'

type NewCategoryFormProps = {
  initialData: Category | null
}

export const NewCategoryForm = ({ initialData }: NewCategoryFormProps) => {
  const {
    isAlertModalOpen,
    isDeleting,
    setIsAlertModalOpen,
    onDeleteCategory,
    title,
    isPending,
    form,
    onSubmit,
    action
  } = useNewCategoryForm({ initialData })

  return (
    <>
      <AlertModal
        isOpen={isAlertModalOpen}
        description="This action will delete the category and all courses vinculated to it."
        loading={isDeleting}
        onClose={() => {
          setIsAlertModalOpen(false)
        }}
        onConfirm={async () => {
          await onDeleteCategory()
        }}
      />
      <div className="flex flex-col">
        <div className="flex items-center">
          <BackButton route={appRoutes.admin_categories} />

          <div className="flex items-center justify-between w-full">
            <Header title={title} />
            {initialData && (
              <Button
                disabled={isPending}
                variant="destructive"
                size="icon"
                onClick={() => {
                  setIsAlertModalOpen(true)
                }}
              >
                <Icons.trash className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <Separator className="mb-6" />
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
                        data-testid="name"
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
            <Button
              data-testid="submit"
              disabled={isPending}
              className="ml-auto"
              type="submit"
            >
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
