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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

import { appRoutes } from '@/lib/constants'
import { type Classroom, type ClassroomModule } from '@prisma/client'
import { useNewClassroomModuleForm } from './use-new-classroom-module-form'

type NewClassroomModuleFormProps = {
  initialData: ClassroomModule | null
  classrooms: Classroom[]
}

export const NewClassroomModuleForm = ({
  initialData,
  classrooms
}: NewClassroomModuleFormProps) => {
  const {
    isAlertModalOpen,
    setIsAlertModalOpen,
    title,
    description,
    action,
    form,
    isDeleting,
    isPending,
    onSubmit,
    onDeleteClassroomModule,
    router
  } = useNewClassroomModuleForm({ initialData })

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
            router.push(`${appRoutes.admin_classroom}?tabSelected=classroom`)
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
                name="classroomId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Classrooms</FormLabel>
                    {classrooms.length ? (
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="classroom">
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a classroom"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {classrooms.map(value => (
                            <SelectItem
                              data-testid={value.title}
                              key={value.id}
                              value={value.id}
                            >
                              {value.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex flex-col gap-y-2">
                        <span className="text-muted-foreground font-medium text-sm">
                          You must create a classrom before create a module to
                          him.
                        </span>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-1/3"
                          onClick={() => {
                            router.push(appRoutes.admin_classroom_new)
                          }}
                        >
                          Create Classroom
                        </Button>
                      </div>
                    )}
                    {classrooms.length && (
                      <FormDescription>
                        Select the classroom this module represents.
                      </FormDescription>
                    )}
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
