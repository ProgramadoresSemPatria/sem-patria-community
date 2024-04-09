import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Event } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Name is required'
  }),
  description: z.string().min(1, {
    message: 'Description is required'
  }),
  date: z.date().min(new Date(), {
    message: 'Date is required'
  }),
  location: z.string().min(1, {
    message: 'Location is required'
  }),
  externalUrl: z.string().optional(),
  specialGuest: z.string().optional()
})

type NewEventFormValues = z.infer<typeof formSchema>

type UseNewEventFormProps = {
  initialData: Event | null
}

export const useNewEventForm = ({ initialData }: UseNewEventFormProps) => {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const hours = Array.from(Array(24).keys()).map(item => item.toString())
  const minutes = [
    '00',
    '5',
    '10',
    '15',
    '20',
    '25',
    '30',
    '35',
    '40',
    '45',
    '50',
    '55'
  ]

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const [hasExternalUrl, setHasExternalUrl] = useState(
    !!initialData?.externalUrl ?? false
  )
  const [hasSpecialGuest, setHasSpecialGuest] = useState(
    !!initialData?.specialGuest ?? false
  )
  const [hour, setHour] = useState(
    initialData ? new Date(initialData.date).getUTCHours() : '18'
  )
  const [minute, setMinute] = useState(
    initialData ? new Date(initialData.date).getUTCMinutes() : '00'
  )

  const title = initialData ? 'Edit event' : 'Create event'
  const toastMessage = initialData
    ? 'Event updated.'
    : 'Event created successfully'
  const action = initialData ? 'Save changes' : 'Create event'

  const form = useForm<NewEventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          externalUrl: initialData.externalUrl ?? undefined,
          specialGuest: initialData.specialGuest ?? undefined
        }
      : {
          title: '',
          description: '',
          date: new Date(),
          location: '',
          externalUrl: '',
          specialGuest: ''
        }
  })

  const { mutateAsync: deleteEvent, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      return await api.delete(`/api/event/${params.eventId}`)
    },
    onSuccess: () => {
      router.push(appRoutes.admin_events)
      router.refresh()
      toast({
        title: 'Success',
        description: 'Event was deleted successfully.'
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

  const { mutateAsync: createOrUpdateEvent, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      if (initialData) {
        return await api.patch(`/api/event/${params.eventId}`, data)
      }

      return await api.post(`/api/event`, data)
    },
    onSuccess: () => {
      router.push(appRoutes.admin_events)
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

  const onSubmit = async (values: NewEventFormValues) => {
    values.date.setUTCHours(Number(hour))
    values.date.setUTCMinutes(Number(minute))

    await createOrUpdateEvent(values)
  }

  const onDeleteEvent = async () => {
    try {
      await deleteEvent()
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
    isDeleting,
    setIsAlertModalOpen,
    onDeleteEvent,
    router,
    title,
    isPending,
    form,
    onSubmit,
    action,
    hour,
    hours,
    setHour,
    minute,
    minutes,
    setMinute,
    hasExternalUrl,
    setHasExternalUrl,
    hasSpecialGuest,
    setHasSpecialGuest
  }
}
