'use client'

import BackButton from '@/components/back-button'
import Header from '@/components/header'
import { Icons } from '@/components/icons'
import { AlertModal } from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { appRoutes } from '@/lib/constants'
import { type Classroom } from '@prisma/client'
import { useNewClassroomForm } from './use-new-classroom-form'

type NewClassroomFormProps = {
  initialData: Classroom | null
}

export const NewClassroomForm = ({ initialData }: NewClassroomFormProps) => {
  const {
    isAlertModalOpen,
    isDeleting,
    setIsAlertModalOpen,
    onDeleteClassroom,
    title,
    isPending,
    form,
    onSubmit,
    action,
    roles
  } = useNewClassroomForm({ initialData })

  return (
    <>
      <AlertModal
        isOpen={isAlertModalOpen}
        description="This action will delete the classroom and all modules vinculated to it."
        loading={isDeleting}
        onClose={() => {
          setIsAlertModalOpen(false)
        }}
        onConfirm={async () => {
          await onDeleteClassroom()
        }}
      />
      <div className="flex flex-col">
        <div className="flex items-center">
          <BackButton
            route={`${appRoutes.admin_classroom}?tabSelected=classroom`}
          />

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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        data-testid="title"
                        disabled={isPending}
                        placeholder="Classroom title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="permissions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permissions</FormLabel>
                    <FormDescription className="!mt-0">
                      Select the role that can be accessed by this classroom
                    </FormDescription>
                    <RadioGroup
                      onValueChange={value => {
                        form.setValue('permissions', [value])
                      }}
                      className="flex flex-col flex-wrap gap-4 pt-2"
                    >
                      {Object.values(roles).map(value => (
                        <FormItem key={value}>
                          <FormLabel className="flex items-center gap-2">
                            <FormControl className="flex items-center gap-4">
                              <RadioGroupItem
                                value={value}
                                checked={
                                  !!form
                                    .getValues('permissions')
                                    .includes(value)
                                }
                              />
                            </FormControl>
                            {value}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
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
