'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { type Season } from './columns'
import { appRoutes } from '@/lib/constants'
import { useRouter } from 'next/navigation'

type SeasonDataTableRowActionsProps = {
  data: Season
}

export const SeasonDataTableRowActions = ({
  data
}: SeasonDataTableRowActionsProps) => {
  const router = useRouter()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Icons.spread className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => {
            router.push(`${appRoutes.admin_seasons}/${data.id}`)
          }}
        >
          Edit
          <DropdownMenuShortcut>
            <Icons.edit size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="!text-red-500">
          Delete
          <DropdownMenuShortcut>
            <Icons.trash size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
