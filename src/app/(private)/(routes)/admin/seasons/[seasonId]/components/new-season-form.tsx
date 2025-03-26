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
import { type Season, type PositionMultiplier } from '@prisma/client'
import Header from '@/components/header'
import { Icons } from '@/components/icons'
import { appRoutes } from '@/lib/constants'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { MetadataTable } from './metadata-table'
import { PositionMultipliersTable } from './position-multipliers-table'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { AlertModal } from '@/components/modals/alert-modal'
import { useState } from 'react'

type NewSeasonFormProps = {
  initialData: Season
}

export const NewSeasonForm = ({ initialData }: NewSeasonFormProps) => {
  const { action, form, title, onSubmit, deleteSeason } = useNewSeasonForm({
    initialData
  })
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const handleDelete = async () => {
    setIsAlertModalOpen(true)
  }

  const onDeleteSeason = async () => {
    try {
      await deleteSeason()
    } catch (error) {
      console.error('Error deleting season', error)
    } finally {
      setIsAlertModalOpen(false)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <BackButton route={appRoutes.admin_seasons} />

        <div className="flex items-center justify-between w-full">
          <Header title={title} />
          {initialData && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={handleDelete}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
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
            </div>

            <div className="md:col-span-1">
              <FormField
                control={form.control}
                name="isCurrent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Season</FormLabel>
                    <div className="flex gap-3 items-center">
                      <Switch
                        id="is-current"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-label="Is Current Season"
                      />
                      <Label htmlFor="is-current">
                        {field.value ? 'Yes' : 'No'}
                      </Label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-3">
              <FormField
                control={form.control}
                name="initDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Date</FormLabel>
                    <FormDescription>
                      Select the initial date of the season
                    </FormDescription>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            type="button"
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
                      Select the end date of the season
                    </FormDescription>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            type="button"
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
            </div>

            <div className="md:col-span-3">
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

            <div className="md:col-span-3">
              <FormField
                control={form.control}
                name="positionMultipliers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position Multipliers</FormLabel>
                    <FormControl>
                      <PositionMultipliersTable
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button data-testid="submit" className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>

      <AlertModal
        isOpen={isAlertModalOpen}
        description="This action will delete the season."
        onClose={() => {
          setIsAlertModalOpen(false)
        }}
        onConfirm={onDeleteSeason}
        loading={false}
      />
    </div>
  )
}
