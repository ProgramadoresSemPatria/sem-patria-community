'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { InterestCellAction } from './interest-cell-action'

export type InterestColumn = {
  id: string
  interest: string
  createdAt: string
}

export const columns: Array<ColumnDef<InterestColumn>> = [
  {
    accessorKey: 'interest',
    header: 'Name',
    cell: ({ row }) => (
      <span>
        {row.original.interest.charAt(0).toUpperCase() +
          row.original.interest.slice(1)}
      </span>
    )
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <InterestCellAction data={row.original} />
  }
]
