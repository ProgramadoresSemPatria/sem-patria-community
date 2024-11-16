import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  FormControl,
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
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import useLocationInput from './use-location-input'

interface LocationInputProps {
  isUpdating: boolean
}

const LocationInput = ({ isUpdating }: LocationInputProps) => {
  const [open, setOpen] = useState(false)

  const { control, watch } = useFormContext()
  const { setInputValue, predictions, loadingPredictions } = useLocationInput()

  const locationValue = watch('location')
  const [value, setValue] = useState(locationValue)

  return (
    <FormField
      control={control}
      name="location"
      disabled={isUpdating}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Location</FormLabel>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full max-w-[500px] justify-between"
                >
                  <span className="truncate">
                    {value && value !== '' ? value : 'Select your location'}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search location"
                    onChangeCapture={e => {
                      setInputValue(e.currentTarget.value)
                    }}
                  />
                  <CommandList className="overflow-y-hidden py-1">
                    <ScrollArea className="h-[150px] w-full pr-2">
                      {loadingPredictions ? (
                        <Icons.loader className="animate-spin duration-100 text-muted-foreground mx-auto mt-4 w-5 h-5" />
                      ) : (
                        <>
                          <CommandEmpty>No location was found.</CommandEmpty>
                          <CommandGroup>
                            {!predictions?.length && (
                              <CommandItem className="pointer-events-none justify-center">
                                No locations was found.
                              </CommandItem>
                            )}
                            {predictions?.length &&
                              predictions?.map(location => (
                                <CommandItem
                                  key={location.value}
                                  value={location.value}
                                  onSelect={currentValue => {
                                    setValue(
                                      currentValue === location.value
                                        ? ''
                                        : location.value
                                    )
                                    field.onChange(
                                      currentValue === location.value
                                        ? ''
                                        : location.value
                                    )
                                    setOpen(false)
                                  }}
                                  className="items-start"
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      value === location.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  {location.label}
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </>
                      )}
                    </ScrollArea>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default LocationInput
