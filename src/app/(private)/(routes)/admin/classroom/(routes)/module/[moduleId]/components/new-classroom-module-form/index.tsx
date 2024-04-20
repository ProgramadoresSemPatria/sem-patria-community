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

import { Label } from '@/components/ui/label'
import { appRoutes } from '@/lib/constants'
import { type Classroom, type ClassroomModule } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { UploadImageModule } from '../upload-image-module'
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
    action,
    form,
    isDeletingModule,
    isPending,
    onSubmit,
    onDeleteClassroomModule,
    router,
    previewImage,
    onSetPreviewImage,
    onDeleteImageModule,
    isDeletingImageModule
  } = useNewClassroomModuleForm({ initialData })

  return (
    <>
      <AlertModal
        isOpen={isAlertModalOpen}
        description="Are you sure you want to delete this module?"
        loading={isDeletingModule}
        onClose={() => {
          setIsAlertModalOpen(false)
        }}
        onConfirm={async () => {
          await onDeleteClassroomModule()
        }}
      />
      <div className="flex flex-col">
        <div className="flex items-center">
          <Button
            size="icon"
            variant="outline"
            onClick={() => {
              router.push(`${appRoutes.admin_classroom}?tabSelected=classroom`)
            }}
            className="flex items-center justify-center mr-4"
          >
            <Icons.arrowBack className="h-5 w-5" />
          </Button>

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
              <div className="flex flex-col gap-y-6">
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
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={field.value}
                                placeholder="Select a classroom"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {classrooms.map(value => (
                              <SelectItem key={value.id} value={value.id}>
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
                      {classrooms.length > 0 && (
                        <FormDescription>
                          Select the classroom this module represents.
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={
                    isPending || isDeletingImageModule || isDeletingModule
                  }
                  className="mr-auto mt-4"
                  type="submit"
                >
                  {isPending && (
                    <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {action}
                </Button>
              </div>

              <FormField
                control={form.control}
                name="fileUrl"
                render={() => (
                  <FormItem>
                    <FormLabel>Module thumbnail</FormLabel>
                    <FormControl>
                      <UploadImageModule
                        onSetPreviewImage={onSetPreviewImage}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-y-2">
                <div className="flex justify-between items-center">
                  <Label>Image preview</Label>
                  {previewImage && (
                    <Button
                      variant="link"
                      className="text-rose-600 !p-0 h-auto text-sm"
                      onClick={() => {
                        onDeleteImageModule(previewImage)
                      }}
                      disabled={isDeletingImageModule}
                      type="button"
                    >
                      Remove image
                      {isDeletingImageModule ? (
                        <Icons.loader className="h-4 w-4 ml-2 animate-spin text-primary" />
                      ) : (
                        <Icons.trash className="h-4 w-4 ml-2 text-rose-600" />
                      )}
                    </Button>
                  )}
                </div>
                {previewImage ? (
                  <Link
                    href={previewImage}
                    target="_blank"
                    className="cursor-pointer"
                  >
                    <Image
                      src={previewImage}
                      alt="uploaded-image"
                      width={1920}
                      height={1080}
                      className="w-full h-auto max-h-[calc(100vh-250px)] rounded-md"
                    />
                  </Link>
                ) : (
                  <span className="font-medium text-sm text-muted-foreground">
                    No image uploaded yet.
                  </span>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}
