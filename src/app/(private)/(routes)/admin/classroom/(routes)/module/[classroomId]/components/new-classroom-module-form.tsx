'use client'

import Header from '@/components/header'
import { Icons } from '@/components/icons'
import { AlertModal } from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Roles, type Classroom } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

type NewClassroomModuleFormProps = {
  initialData: Classroom | null
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required'
  }),
  permissions: z.string().array().nonempty()
})

type NewClassroomModuleFormValues = z.infer<typeof formSchema>

export const NewClassroomModuleForm = ({
  initialData
}: NewClassroomModuleFormProps) => {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const title = initialData ? 'Edit Module' : 'Create Module'
  const description = initialData ? 'Edit a Module' : 'Add a new Module.'
  const toastMessage = initialData
    ? 'Module updated.'
    : 'Module created successfully'
  const action = initialData ? 'Save changes' : 'Create Module'

  const form = useForm<NewClassroomModuleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title ?? '',
      permissions: initialData?.permissions ?? []
    }
  })

  const { mutateAsync: deleteClassroomModule, isPending: isDeleting } =
    useMutation({
      mutationFn: async () => {
        return await api.delete(`/api/classroom/module/${params.classroomId}`)
      },
      onSuccess: () => {
        router.push(appRoutes.admin_classroom)
        router.refresh()
        toast({
          title: 'Success',
          description: 'Module deleted successfully.'
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

  const { mutateAsync: createOrUpdateClassroomModule, isPending } = useMutation(
    {
      mutationFn: async (data: z.infer<typeof formSchema>) => {
        if (initialData) {
          return await api.patch(
            `/api/classroom/module/${params.classroomId}`,
            data
          )
        }

        return await api.post(`/api/classroom/module`, data)
      },
      onSuccess: () => {
        router.push(appRoutes.admin_classroom)
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
    }
  )

  const onSubmit = async (values: NewClassroomModuleFormValues) => {
    await createOrUpdateClassroomModule(values)
  }

  const onDeleteClassroomModule = async () => {
    try {
      await deleteClassroomModule()
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

  const { Admin, Builder, ...roles } = Roles

  return (
    <>
      <AlertModal
        isOpen={isAlertModalOpen}
        description="Are you sure you want to delete this module?"
        loading={isDeleting}
        onClose={() => {
          setIsAlertModalOpen(false)
        }}
        onConfirm={async () => {
          await onDeleteClassroomModule()
        }}
      />
      <div className="flex flex-col">
        <Button
          size="icon"
          variant="link"
          onClick={() => {
            router.push(appRoutes.admin_classroom)
          }}
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
              onClick={() => {
                setIsAlertModalOpen(true)
              }}
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
                      Select all roles that can be accessed by this classroom
                    </FormDescription>
                    <FormControl>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {Object.values(roles).map(value => {
                          return (
                            <div
                              key={value}
                              className="flex items-center gap-x-2"
                            >
                              <Checkbox
                                checked={
                                  !!form
                                    .getValues('permissions')
                                    .includes(value)
                                }
                                onCheckedChange={checked => {
                                  if (checked) {
                                    form.setValue('permissions', [
                                      value,
                                      ...form.getValues('permissions')
                                    ])
                                  } else {
                                    const permissions = form
                                      .getValues('permissions')
                                      .filter(
                                        (permission: string) =>
                                          permission !== value
                                      )
                                    form.setValue('permissions', [
                                      ...permissions
                                    ] as [string, ...string[]])
                                  }
                                }}
                              />
                              <Label>{value}</Label>
                            </div>
                          )
                        })}
                      </div>
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
