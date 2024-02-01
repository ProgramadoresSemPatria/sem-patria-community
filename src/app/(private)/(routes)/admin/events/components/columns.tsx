'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { EventCellAction } from './event-cell-action'

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
    cell: cell => {
      // ! This is a workaround to fix the timezone issue
      const date = new Date(cell.getValue() as string)
      const offset = date.getTimezoneOffset()
      const adjustedDate = new Date(date.getTime() + offset * 60 * 1000)
      return format(adjustedDate, 'dd/MM/yyyy - HH:mm', {
        locale: ptBR
      })
    }
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
