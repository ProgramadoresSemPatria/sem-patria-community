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
import { Reorder } from 'framer-motion'
import Image from 'next/image'
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
    roles,
    classroomModules,
    setClassroomModules,
    handleSaveOrder
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
            <Button disabled={isPending} className="ml-auto" type="submit">
              {isPending && (
                <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              {action}
            </Button>
          </form>
        </Form>
        <Separator className="mt-8" />

        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h1>Modules</h1>
            <Button
              variant="default"
              size="sm"
              onClick={async () => {
                await handleSaveOrder(classroomModules)
              }}
            >
              Save Order
            </Button>
          </div>
          <Separator className="my-4 border-dashed border bg-transparent" />
          <Reorder.Group
            values={classroomModules}
            onReorder={setClassroomModules}
          >
            <div className="flex flex-col space-y-6 w-full">
              {classroomModules.map((module, index) => (
                <Reorder.Item value={module} key={module.id} drag="y">
                  <div className="p-4 bg-muted rounded-md shadow cursor-grab">
                    <div className="flex items-center w-full">
                      {module.fileUrl ? (
                        <Image
                          src={module.fileUrl}
                          alt={module.title}
                          width={40}
                          height={40}
                        />
                      ) : (
                        <div className="size-10 rounded-md bg-gray-300" />
                      )}
                      <span className="font-medium pl-4">
                        {index + 1} - {module.title}
                      </span>
                      <Icons.grip className="ml-auto size-4 cursor-grab" />
                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </div>
          </Reorder.Group>
        </div>
      </div>
    </>
  )
}
