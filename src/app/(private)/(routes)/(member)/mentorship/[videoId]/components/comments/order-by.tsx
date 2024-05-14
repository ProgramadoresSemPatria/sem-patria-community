import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface OrderByProps {
  orderByValue: string
  setOrderByValue: (value: string) => void
}

const orderByValues = [
  {
    value: 'recent',
    label: 'Most Recent'
  },
  {
    value: 'upvotes',
    label: 'Most Upvotes'
  }
]

export const OrderBy = ({ orderByValue, setOrderByValue }: OrderByProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Icons.arrowUpDown className="h-4" />
          Order by
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuRadioGroup
          value={orderByValue}
          onValueChange={setOrderByValue}
        >
          {orderByValues.map(orderByValue => (
            <DropdownMenuRadioItem
              key={orderByValue.value}
              value={orderByValue.value}
            >
              {orderByValue.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
