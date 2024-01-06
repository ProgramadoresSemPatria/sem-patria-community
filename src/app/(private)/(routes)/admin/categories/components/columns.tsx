'use client'

import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { validateIsPendingColor } from '@/lib/utils'
import { type ColumnDef } from '@tanstack/react-table'
import { CategoryCellAction } from './category-cell-action'

export type CategoryColumn = {
  id: string
  name: string
  createdAt: string
  isPending: boolean
}

export const columns: Array<ColumnDef<CategoryColumn>> = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <span>
        {row.original.name.charAt(0).toUpperCase() + row.original.name.slice(1)}
      </span>
    )
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },
  {
    accessorKey: 'isPending',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          Pending
          <Icons.arrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { background, text } = validateIsPendingColor(
        row.original.isPending
      )

      return <Badge className={`${background}`}>{text}</Badge>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CategoryCellAction data={row.original} />
  }
]
