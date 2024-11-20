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
import { type Interest } from '@prisma/client'
import { useNewInterestForm } from './use-new-interest-form'

type NewInterestFormProps = {
  initialData: Interest | null
}

export const NewInterestForm = ({ initialData }: NewInterestFormProps) => {
  const {
    isAlertModalOpen,
    isDeleting,
    setIsAlertModalOpen,
    onDeleteInterest,
    title,
    isPending,
    form,
    onSubmit,
    action
  } = useNewInterestForm({ initialData })

  return (
    <>
      <AlertModal
        isOpen={isAlertModalOpen}
        description="This action will delete the interest."
        loading={isDeleting}
        onClose={() => {
          setIsAlertModalOpen(false)
        }}
        onConfirm={async () => {
          await onDeleteInterest()
        }}
      />
      <div className="flex flex-col">
        <div className="flex items-center">
          <BackButton route={appRoutes.admin_interests} />

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
                name="interest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Interest"
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
