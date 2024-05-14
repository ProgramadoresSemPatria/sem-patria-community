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

import BackButton from '@/components/back-button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { appRoutes } from '@/lib/constants'
import { type Video } from '@prisma/client'
import { type ModulesByClassroomProps } from './types'
import { useNewClassroomVideoForm } from './use-new-classroom-video-form'

type NewClassroomVideoFormProps = {
  initialData: Video | null
  modules: ModulesByClassroomProps[]
}

export const NewClassroomVideoForm = ({
  initialData,
  modules
}: NewClassroomVideoFormProps) => {
  const {
    isAlertModalOpen,
    setIsAlertModalOpen,
    title,
    action,
    form,
    isDeleting,
    isPending,
    onSubmit,
    onDeleteClassroomVideo
  } = useNewClassroomVideoForm({ initialData })

  return (
    <>
      <AlertModal
        isOpen={isAlertModalOpen}
        description="Are you sure you want to delete this video?"
        loading={isDeleting}
        onClose={() => {
          setIsAlertModalOpen(false)
        }}
        onConfirm={async () => {
          await onDeleteClassroomVideo()
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
                        placeholder="Video title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isPending}
                        placeholder="Video description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {modules.length > 0 && (
                <FormField
                  control={form.control}
                  name="classroomModuleId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Modules (optional)</FormLabel>

                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a module"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {modules.map(value => (
                            <SelectItem key={value.id} value={value.id}>
                              {`${value.classroomName} - ${value.title}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video URL</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="https://..."
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
