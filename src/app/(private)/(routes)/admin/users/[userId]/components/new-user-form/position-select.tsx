import { Icons } from '@/components/icons'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Positions } from '@/lib/types'

import { useFormContext } from 'react-hook-form'

interface PositionSelectProps {
  isPending: boolean
}

const PositionIconMap = {
  AMBASSADOR: <Icons.award className="w-4 h-4 inline-flex" />,
  BUILDER: <Icons.hammer className="w-4 h-4 inline-flex" />,
  PSP: <Icons.globe className="w-4 h-4 inline-flex" />,
  BASE: <Icons.book className="w-4 h-4 inline-flex" />,
  ADMIN: <Icons.gear className="w-4 h-4 inline-flex" />
}

const PositionSelect = ({ isPending }: PositionSelectProps) => {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name="position"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Position</FormLabel>
          {Positions && (
            <Select
              disabled={isPending}
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger data-testid="role">
                  <SelectValue placeholder="Select a position" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.entries(Positions).map(([key, value]) => (
                  <SelectItem
                    key={key}
                    value={key}
                    className="flex gap-4 font-medium items-center"
                  >
                    {PositionIconMap[key as keyof typeof PositionIconMap]}{' '}
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default PositionSelect
