'use client'

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

type NewClassroomFormProps = {
  initialData: Classroom | null
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required'
  }),
  permissions: z.string().array().nonempty({
    message: 'Please select a permission.'
  })
})

type NewClassroomFormValues = z.infer<typeof formSchema>

export const NewClassroomForm = ({ initialData }: NewClassroomFormProps) => {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const title = initialData ? 'Edit Classroom' : 'Create Classroom'
  const description = initialData ? 'Edit a Classroom' : 'Add a new Classroom.'
  const toastMessage = initialData
    ? 'Classroom updated.'
    : 'Classroom created successfully'
  const action = initialData ? 'Save changes' : 'Create Classroom'

  const form = useForm<NewClassroomFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title ?? '',
      permissions: initialData?.permissions ?? []
    }
  })

  const { mutateAsync: deleteClassroom, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      return await api.delete(`/api/classroom/${params.classroomId}`)
    },
    onSuccess: () => {
      router.push(appRoutes.admin_classroom)
      router.refresh()
      toast({
        title: 'Success',
        description: 'Classroom deleted successfully.'
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

  const { mutateAsync: createOrUpdateClassroom, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      if (initialData) {
        return await api.patch(`/api/classroom/${params.classroomId}`, data)
      }

      return await api.post(`/api/classroom`, data)
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
  })

  const onSubmit = async (values: NewClassroomFormValues) => {
    values.permissions.push(Roles.Admin)
    await createOrUpdateClassroom(values)
  }

  const onDeleteClassroom = async () => {
    try {
      await deleteClassroom()
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
                      className="grid max-w-full grid-cols-2 gap-4 pt-2"
                    >
                      {Object.values(roles).map(value => (
                        <FormItem key={value}>
                          <FormLabel className="flex items-center gap-x-2">
                            <FormControl className="flex items-center gap-x-4">
                              <RadioGroupItem
                                data-testid={value}
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
