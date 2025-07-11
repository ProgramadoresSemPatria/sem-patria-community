'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { SeasonDataTableRowActions } from './season-data-table-row-actions'
import { Badge } from '@/components/ui/badge'
import { type Season } from '@prisma/client'

export const createSeasonsColumns = (
  refetch: () => void
): Array<ColumnDef<Season>> => [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: cell => {
      if (!cell.getValue()) return '-'

      return (
        <p className="max-w-[300px] truncate">{cell.getValue() as string}</p>
      )
    }
  },
  {
    accessorKey: 'initDate',
    header: 'Start Date',
    cell: cell => {
      if (!cell.getValue()) return '-'

      const date = new Date(cell.getValue() as string)
      return (
        <p className="max-w-[160px] line-clamp-1">
          {format(date, 'dd/MM/yyyy HH:mm', {
            locale: ptBR
          })}
        </p>
      )
    }
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: cell => {
      if (!cell.getValue()) return '-'

      const date = new Date(cell.getValue() as string)
      return (
        <p className="max-w-[160px] line-clamp-1">
          {format(date, 'dd/MM/yyyy HH:mm', {
            locale: ptBR
          })}
        </p>
      )
    }
  },
  {
    accessorKey: 'isCurrent',
    header: 'Current Season',
    cell: ({ row }) => {
      const isCurrent = row.getValue('isCurrent') as boolean
      return (
        <Badge variant={isCurrent ? 'secondary' : 'destructive'}>
          {isCurrent ? 'Yes' : 'No'}
        </Badge>
      )
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <SeasonDataTableRowActions data={row.original} refetch={refetch} />
    )
  }
]
