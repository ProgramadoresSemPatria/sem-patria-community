'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'
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
    header: 'Title',
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="max-w-[150px] line-clamp-1">
                {row.getValue('title')}
              </span>
            </TooltipTrigger>
            <TooltipContent>{row.getValue('title')}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="max-w-[400px] line-clamp-1">
                {row.getValue('description')}
              </span>
            </TooltipTrigger>
            <TooltipContent>{row.getValue('description')}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
  },
  {
    accessorKey: 'date',
    header: 'Event Date',
    cell: cell => {
      // ! This is a workaround to fix the timezone issue
      const date = new Date(cell.getValue() as string)
      const offset = date.getTimezoneOffset()
      const adjustedDate = new Date(date.getTime() + offset * 60 * 1000)
      return (
        <span className="max-w-[150px] line-clamp-1">
          {format(adjustedDate, 'dd/MM/yyyy - HH:mm', {
            locale: ptBR
          })}
        </span>
      )
    }
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => {
      return (
        <span className="max-w-[100px] line-clamp-1">
          {row.getValue('location')}
        </span>
      )
    }
  },
  {
    accessorKey: 'externalUrl',
    id: 'Url',
    header: 'External Url',
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                target="_blank"
                href={row.getValue('Url')}
                className="max-w-[150px] line-clamp-1"
              >
                <Button variant="link" className="p-0">
                  {row.getValue('Url')}
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>{row.getValue('Url')}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
  },
  {
    accessorKey: 'specialGuest',
    id: 'Guest',
    header: 'Special Guest',
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="max-w-[100px] line-clamp-1">
                {row.getValue('Guest')}
              </span>
            </TooltipTrigger>
            <TooltipContent>{row.getValue('Guest')}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row, cell }) => (
      <div className="max-w-[50px]">
        <EventCellAction data={row.original} cell={cell} />
      </div>
    )
  }
]
