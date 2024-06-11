import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Video } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required'
  }),
  description: z.string().optional(),
  videoUrl: z.string().url(),
  classroomModuleId: z.string().uuid().optional()
})

type NewClassroomVideoFormValues = z.infer<typeof formSchema>

type UseNewClassroomVideoFormProps = {
  initialData: Video | null
}

export const useNewClassroomVideoForm = ({
  initialData
}: UseNewClassroomVideoFormProps) => {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

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
      classroomModuleId: initialData?.classroomModuleId ?? undefined
    }
  })

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
      onError: () => {
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
        return await api.patch(`/api/classroom/video/${params.videoId}`, data)
      }

      return await api.post(`/api/classroom/video`, data)
    },
    onSuccess: () => {
      router.push(`${appRoutes.admin_classroom}?tabSelected=videos`)
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

  const onSubmit = async (values: NewClassroomVideoFormValues) => {
    await createOrUpdateClassroomVideo(values)
  }

  const onDeleteClassroomVideo = async () => {
    try {
      await deleteClassroomVideo()
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
  return {
    isAlertModalOpen,
    setIsAlertModalOpen,
    title,
    action,
    form,
    isDeleting,
    isPending,
    onSubmit,
    onDeleteClassroomVideo
  }
}
