'use client'

import BackButton from '@/components/back-button'
import Header from '@/components/header'
import { Icons } from '@/components/icons'
import { AlertModal } from '@/components/modals/alert-modal'
import { Badge } from '@/components/ui/badge'
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
import { appRoutes } from '@/lib/constants'
import { Roles } from '@/lib/types'
import { cn } from '@/lib/utils'
import { type Event } from '@prisma/client'
import { format } from 'date-fns'
import { useNewEventForm } from './use-new-event-form'

type NewEventFormProps = {
  initialData: Event | null
}

type Role = keyof typeof Roles

export const NewEventForm = ({ initialData }: NewEventFormProps) => {
  const {
    isAlertModalOpen,
    isDeleting,
    setIsAlertModalOpen,
    onDeleteEvent,
    title,
    isPending,
    form,
    onSubmit,
    action,
    hours,
    hour,
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
  } = useNewEventForm({ initialData })

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
        <div className="flex items-center">
          <BackButton route={appRoutes.admin_events} />

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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        data-testid="description"
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
                        data-testid="location"
                        disabled={isPending}
                        placeholder="Event location"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                      <PopoverTrigger data-testid="date" asChild>
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
                    <SelectTrigger data-testid="hour" className="w-fit">
                      <SelectValue placeholder={`${hour}h`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {hours.map(hour => (
                          <SelectItem
                            data-testid={hour}
                            key={hour}
                            value={hour}
                          >
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
                    <SelectTrigger data-testid="minute" className="w-fit">
                      <SelectValue placeholder={`${minute}min`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {minutes.map(minute => (
                          <SelectItem
                            data-testid={minute}
                            key={minute}
                            value={minute}
                          >
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
                        data-testid="externalUrl"
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
                        data-testid="externalUrlInput"
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
                        data-testid="specialGuest"
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
                        data-testid="specialGuestInput"
                        {...field}
                        disabled={field.disabled ?? isPending}
                        placeholder="Event special guest"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-y-2 w-full">
                <FormField
                  control={form.control}
                  name="allowedRoles"
                  render={() => (
                    <FormItem>
                      <FormLabel>Allowed Roles</FormLabel>
                      <FormDescription>
                        Select which roles can see this event.
                      </FormDescription>
                      {Roles && (
                        <Select disabled={isPending}>
                          <FormControl>
                            <SelectTrigger data-testid="allowedRoles">
                              <SelectValue
                                placeholder={
                                  selectedRoles.length > 0
                                    ? `${selectedRoles.length} selected`
                                    : 'Select roles'
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(Roles).map(([key, value]) => (
                              <div
                                key={key}
                                className="flex gap-x-2 items-center"
                              >
                                <Checkbox
                                  data-testid={key}
                                  onCheckedChange={() => {
                                    handleSelectedRoles(key)
                                  }}
                                  key={key}
                                  value={key}
                                  checked={selectedRoles.includes(key as Role)}
                                />
                                <label>{value}</label>
                              </div>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-wrap gap-1 max-w-full">
                  {selectedRoles.map(role => (
                    <Badge key={role}>
                      {Roles[role]}
                      <span
                        className="ml-2 hover:cursor-pointer"
                        onClick={() => {
                          handleSelectedRoles(role)
                        }}
                      >
                        <Icons.close size={15} />
                      </span>
                    </Badge>
                  ))}
                </div>
              </div>
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
