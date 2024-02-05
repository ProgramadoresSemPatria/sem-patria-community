'use client'

import Header from '@/components/header'
import { Icons } from '@/components/icons'
import { AlertModal } from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Event } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

type NewEventFormProps = {
  initialData: Event | null
}

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

export const NewEventForm = ({ initialData }: NewEventFormProps) => {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

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
  const description = initialData
    ? 'Edit a event'
    : 'Add a new event to the community.'
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
    // set the hour and minute of the date
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

  return (
    <>
      <AlertModal
        isOpen={isAlertModalOpen}
        description="Are you sure you want to delete this event?"
        loading={isDeleting}
        onClose={() => {
          setIsAlertModalOpen(false)
        }}
        onConfirm={async () => {
          await onDeleteEvent()
        }}
      />
      <div className="flex flex-col">
        <Button
          size="icon"
          variant="link"
          onClick={() => {
            router.push(appRoutes.admin_events)
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Event title"
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Event description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Event location"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormDescription>
                      Select the date of the event.
                    </FormDescription>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <Icons.calendarDays className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={date => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormDescription>
                  Select the hour and minute of the event.
                </FormDescription>
                <div className="flex gap-2 items-center">
                  <Select
                    onValueChange={value => {
                      setHour(value)
                    }}
                  >
                    <SelectTrigger className="w-fit">
                      <SelectValue placeholder={`${hour}h`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {hours.map(hour => (
                          <SelectItem key={hour} value={hour}>
                            {hour}h
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  :
                  <Select
                    onValueChange={value => {
                      setMinute(value)
                    }}
                  >
                    <SelectTrigger className="w-fit">
                      <SelectValue placeholder={`${minute}min`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {minutes.map(minute => (
                          <SelectItem key={minute} value={minute}>
                            {minute}min
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>

              <FormField
                control={form.control}
                name="externalUrl"
                disabled={!hasExternalUrl}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-2 items-center">
                      External URL
                      <Checkbox
                        checked={hasExternalUrl}
                        onCheckedChange={(checked: boolean) => {
                          setHasExternalUrl(checked)
                          if (!checked) field.onChange('')
                        }}
                      />
                    </FormLabel>
                    <FormDescription>
                      Zoom link, Google Meet, etc.
                    </FormDescription>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={field.disabled ?? isPending}
                        placeholder="Event external url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialGuest"
                disabled={!hasSpecialGuest}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-2 items-center">
                      Special Guest
                      <Checkbox
                        checked={hasSpecialGuest}
                        onCheckedChange={(checked: boolean) => {
                          setHasSpecialGuest(checked)
                          if (!checked) field.onChange('')
                        }}
                      />
                    </FormLabel>
                    <FormDescription>
                      Who is the special guest of the event?
                    </FormDescription>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={field.disabled ?? isPending}
                        placeholder="Event special guest"
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
