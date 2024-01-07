'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { CategoryCellAction } from './category-cell-action'

export type CategoryColumn = {
  id: string
  name: string
  createdAt: string
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
    id: 'actions',
    cell: ({ row }) => <CategoryCellAction data={row.original} />
  }
]
