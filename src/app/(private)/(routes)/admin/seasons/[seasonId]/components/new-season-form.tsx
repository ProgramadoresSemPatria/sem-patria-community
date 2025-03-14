'use client'

import BackButton from '@/components/back-button'
import { useNewSeasonForm } from './use-new-season-form'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { type Season } from '@prisma/client'
import Header from '@/components/header'
import { Icons } from '@/components/icons'
import { appRoutes } from '@/lib/constants'
import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { MetadataTable } from './metadata-table'

type NewSeasonFormProps = {
  initialData: Season
}

export const NewSeasonForm = ({ initialData }: NewSeasonFormProps) => {
  const { action, form, title, onSubmit } = useNewSeasonForm({ initialData })

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <BackButton route={appRoutes.admin_seasons} />

        <div className="flex items-center justify-between w-full">
          <Header title={title} />
          {initialData && (
            <Button variant="destructive" size="icon">
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
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Season Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Season name"
                      autoComplete="off"
                      maxLength={100}
                      data-1p-ignore
                      data-lpignore="true"
                      data-bwignore
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="initDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Date</FormLabel>
                  <FormDescription>
                    Select the initial date of the season.
                  </FormDescription>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
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

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormDescription>
                    Select the end date of the season.
                    {field.value.getDate().toString()}
                  </FormDescription>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
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

            <FormField
              control={form.control}
              name="isCurrent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-2 items-center">
                    Is Current Season?
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-label="Is Current Season"
                    />
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metadata"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metadata</FormLabel>
                  <FormControl>
                    <MetadataTable
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button data-testid="submit" className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  )
}
