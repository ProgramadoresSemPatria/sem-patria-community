'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { EventCellAction } from './course-cell-action'

export type EventColumn = {
  id: string
  title: string
  description: string
  date: Date
  externalUrl: string
  specialGuest: string
}

export const eventColumns: Array<ColumnDef<EventColumn>> = [
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'date',
    header: 'Event Date',
    cell: cell => new Date(cell.getValue() as string).toLocaleDateString()
  },
  {
    accessorKey: 'location',
    header: 'Location'
  },
  {
    accessorKey: 'externalUrl',
    header: 'External Url'
  },
  {
    accessorKey: 'specialGuest',
    header: 'Special Guest'
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <EventCellAction data={row.original} />
  }
]
