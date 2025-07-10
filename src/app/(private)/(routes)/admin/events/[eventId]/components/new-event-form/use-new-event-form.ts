import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import type { Roles } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Event } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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
  specialGuest: z.string().optional(),
  allowedRoles: z.array(z.string()).min(1, {
    message: 'At least one role must be selected'
  })
})

type NewEventFormValues = z.infer<typeof formSchema>

type Role = keyof typeof Roles

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
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])

  const [hasExternalUrl, setHasExternalUrl] = useState(
    !!initialData?.externalUrl
  )
  const [hasSpecialGuest, setHasSpecialGuest] = useState(
    !!initialData?.specialGuest
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
          externalUrl: initialData.externalUrl || undefined,
          specialGuest: initialData.specialGuest || undefined,
          allowedRoles: initialData.allowedRoles || ['ProgramadorSemPatria']
        }
      : {
          title: '',
          description: '',
          date: new Date(),
          location: '',
          externalUrl: '',
          specialGuest: '',
          allowedRoles: ['ProgramadorSemPatria']
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
    onError: err => {
      console.error('Error deleting event', err)
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
    onError: err => {
      console.error('Error creating/updating event', err)
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    }
  })

  const handleSelectedRoles = (role: string) => {
    const newSelectedRoles = [...selectedRoles]
    const index = newSelectedRoles.indexOf(role as Role)
    if (index > -1) {
      newSelectedRoles.splice(index, 1)
    } else {
      newSelectedRoles.push(role as Role)
    }
    setSelectedRoles(newSelectedRoles)
  }

  const onSubmit = async (values: NewEventFormValues) => {
    values.date.setUTCHours(Number(hour))
    values.date.setUTCMinutes(Number(minute))

    const formData = {
      ...values,
      allowedRoles: selectedRoles
    }

    await createOrUpdateEvent(formData)
  }

  const onDeleteEvent = async () => {
    try {
      await deleteEvent()
    } catch (error) {
      console.log('Error deleting event', error)
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    } finally {
      setIsAlertModalOpen(false)
    }
  }

  useEffect(() => {
    if (initialData) {
      setSelectedRoles(initialData.allowedRoles || ['ProgramadorSemPatria'])
    }
  }, [initialData])

  return {
    isAlertModalOpen,
    isDeleting,
    setIsAlertModalOpen,
    onDeleteEvent,
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
    setHasSpecialGuest,
    selectedRoles,
    handleSelectedRoles
  }
}
