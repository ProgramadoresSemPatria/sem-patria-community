import { useToast } from '@/components/ui/use-toast'
import { uploadFiles } from '@/lib/uploadthing'
import { useModuleService } from '@/services/classroom/module/use-module-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { type ClassroomModule } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export const classroomModuleFormSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required'
  }),
  fileUrl: z.string(),
  classroomId: z.string().min(1, {
    message: 'Classroom is required'
  })
})

type NewClassroomModuleFormValues = z.infer<typeof classroomModuleFormSchema>

type UseNewClassroomModuleFormProps = {
  initialData: ClassroomModule | null
}

export const useNewClassroomModuleForm = ({
  initialData
}: UseNewClassroomModuleFormProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const {
    createOrUpdateClassroomModule,
    deleteClassroomModule,
    isDeletingModule,
    isPending,
    deleteImageModule,
    isDeletingImageModule,
    isImageDeleted
  } = useModuleService({ initialData })

  const form = useForm<NewClassroomModuleFormValues>({
    resolver: zodResolver(classroomModuleFormSchema),
    defaultValues: {
      title: initialData?.title ?? '',
      classroomId: initialData?.classroomId ?? '',
      fileUrl: initialData?.fileUrl ?? ''
    }
  })

  const title = initialData ? 'Edit Module' : 'Create Module'
  const action = initialData ? 'Save changes' : 'Create Module'

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState<string>()
  const [imageProps, setImageProps] = useState<File>()
  const [uploadingImage, setUploadingImage] = useState<boolean>(false)

  const onSetPreviewImage = (file: File) => {
    const image = Object.assign(file, {
      preview: URL.createObjectURL(file)
    })
    setPreviewImage(image.preview)
    setImageProps(file)
  }

  const onRemoveImage = () => {
    setPreviewImage(() => undefined)
  }

  const onSubmit = async (values: NewClassroomModuleFormValues) => {
    if (imageProps) {
      setUploadingImage(() => true)
      const file = await uploadFiles('imageUploader', {
        files: [imageProps]
      })
      setUploadingImage(() => false)

      const props = {
        ...values,
        fileUrl: file[0].url
      }

      await createOrUpdateClassroomModule(props)
      return
    }

    await createOrUpdateClassroomModule({
      ...values,
      fileUrl: values.fileUrl ?? undefined
    })
  }

  const onDeleteClassroomModule = async () => {
    try {
      if (initialData?.fileUrl) {
        onDeleteImageModule(initialData.fileUrl)
      }
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

  const onDeleteImageModule = (image: string) => {
    const imageKey = image.substring(image.lastIndexOf('/') + 1)

    deleteImageModule(imageKey)
  }

  useEffect(() => {
    if (isImageDeleted) setPreviewImage(() => undefined)
  }, [isImageDeleted])

  return {
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
    onRemoveImage,
    isDeletingImageModule,
    uploadingImage
  }
}
