import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { uploadFiles } from '@/lib/uploadthing'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Attachment, type Video } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const attachmentSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  type: z.string(),
  size: z.number(),
  url: z.string().url({
    message: 'Invalid attachment URL'
  })
})

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required'
  }),
  description: z.string().optional(),
  videoUrl: z.string().url(),
  classroomModuleId: z.string().uuid().optional(),
  attachments: z.array(attachmentSchema).optional()
})

type NewClassroomVideoFormValues = z.infer<typeof formSchema>

type UseNewClassroomVideoFormProps = {
  initialData: (Video & { attachments: Attachment[] }) | null
}

export type FileWithPreview = {
  file: File
  preview: string
}

export const useNewClassroomVideoForm = ({
  initialData
}: UseNewClassroomVideoFormProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [uploadingFiles, setUploadingFiles] = useState<boolean>(false)
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const addAttRef = useRef(false)
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const title = initialData ? 'Edit Video' : 'Create Video'
  const toastMessage = initialData
    ? 'Video updated.'
    : 'Video created successfully'
  const action = initialData ? 'Save changes' : 'Create Video'

  const form = useForm<NewClassroomVideoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title ?? '',
      description: initialData?.description ?? '',
      videoUrl: initialData?.url ?? '',
      classroomModuleId: initialData?.classroomModuleId ?? undefined,
      attachments: initialData?.attachments ?? []
    }
  })

  const onRemoveFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
  }

  const onSetPreviewFiles = (newFiles: File[]) => {
    const newFileData = newFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setFiles(prevFiles => [...prevFiles, ...newFileData])
  }

  const { mutateAsync: deleteClassroomVideo, isPending: isDeleting } =
    useMutation({
      mutationFn: async () => {
        return await api.delete(`/api/classroom/video/${params.videoId}`)
      },
      onSuccess: () => {
        router.push(`${appRoutes.admin_classroom}?tabSelected=videos`)
        router.refresh()
        toast({
          title: 'Success',
          description: 'Video deleted successfully.'
        })
      },
      onError: err => {
        console.log('Error deleting video', err)
        toast({
          title: 'Error',
          description: 'Something went wrong.',
          variant: 'destructive'
        })
      }
    })

  const { mutateAsync: deleteAttachment } = useMutation({
    mutationFn: async (attachmentId: string) => {
      return await api.delete(
        `/api/classroom/video/${params.videoId}/${attachmentId}`
      )
    },
    onSuccess: () => {
      router.refresh()

      toast({
        title: 'Success',
        description: 'Attachment deleted successfully.'
      })
    },
    onError: err => {
      console.log('Error deleting attachment', err)
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    }
  })

  const { mutateAsync: createOrUpdateClassroomVideo, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      if (initialData) {
        addAttRef.current = true
        return await api.patch(`/api/classroom/video/${params.videoId}`, data)
      }

      return await api.post(`/api/classroom/video`, data)
    },
    onSuccess: () => {
      if (addAttRef.current) {
        router.push(`${appRoutes.mentorship}/${initialData?.id}`)
      } else {
        router.push(`${appRoutes.admin_classroom}?tabSelected=videos`)
      }
      setFiles([])
      router.refresh()
      toast({
        title: 'Success',
        description: `${toastMessage}`
      })
    },
    onError: err => {
      console.log('Error creating/updating classroom video', err)
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    }
  })
  const MAX_FILE_SIZE = 64 * 1024 * 1024

  const onSubmit = async (values: NewClassroomVideoFormValues) => {
    if (files.length > 0) {
      const oversizedFiles = files.filter(
        file => file.file.size > MAX_FILE_SIZE
      )
      if (oversizedFiles.length > 0) {
        oversizedFiles.forEach(file => {
          toast({
            title: 'File Too Large',
            description: `File ${file.file.name} is too large. Max file size is 64MB.`,
            variant: 'destructive'
          })
        })
        return
      }
      setUploadingFiles(true)
      try {
        const uploadedFiles = await Promise.all(
          files.map(async file => {
            const response = await uploadFiles('imageUploader', {
              files: [file.file]
            })
            return {
              name: file.file.name,
              type: file.file.type,
              size: file.file.size,
              url: response[0].url
            }
          })
        )

        const attachments = uploadedFiles.map(file => ({
          name: file.name,
          type: file.type,
          size: file.size,
          url: file.url
        }))

        const props = {
          ...values,
          attachments
        }

        await createOrUpdateClassroomVideo(props)
      } catch (error) {
        console.log('Error creating/updating video', error)
        toast({
          title: 'Error',
          description: 'Failed to upload files. Please try again.',
          variant: 'destructive'
        })
      } finally {
        setUploadingFiles(false)
      }

      return
    }

    await createOrUpdateClassroomVideo(values)
  }

  const onDeleteClassroomVideo = async () => {
    try {
      await deleteClassroomVideo()
    } catch (error) {
      console.log('Error deleting classroom video', error)

      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    } finally {
      setIsAlertModalOpen(false)
    }
  }

  const onDeleteAttachment = async (attachmentId: string) => {
    await deleteAttachment(attachmentId)
  }
  return {
    isAlertModalOpen,
    setIsAlertModalOpen,
    title,
    action,
    form,
    isDeleting,
    isPending,
    onSubmit,
    onDeleteClassroomVideo,
    onSetPreviewFiles,
    files,
    uploadingFiles,
    onRemoveFile,
    onDeleteAttachment
  }
}
