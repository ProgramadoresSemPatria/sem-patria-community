'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { SeasonDataTableRowActions } from './season-data-table-row-actions'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export interface Season {
  id: string
  name: string
  initDate: Date
  endDate: Date
  isCurrent: boolean
  metadata?: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

export const seasonsColumns: Array<ColumnDef<Season>> = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'initDate',
    header: 'Start Date',
    cell: cell => {
      if (!cell.getValue()) return 'No data available'

      const date = new Date(cell.getValue() as string)
      return format(date, 'dd/MM/yyyy', {
        locale: ptBR
      })
    }
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: cell => {
      if (!cell.getValue()) return 'No data available'

      const date = new Date(cell.getValue() as string)
      return format(date, 'dd/MM/yyyy', {
        locale: ptBR
      })
    }
  },
  {
    accessorKey: 'isCurrent',
    header: 'Status',
    cell: ({ row }) => {
      const isCurrent = row.getValue('isCurrent') as boolean
      return (
        <div className="flex space-x-2">
          <Badge
            variant="outline"
            className={cn(
              'capitalize',
              isCurrent
                ? 'bg-emerald-950 text-emerald-500 border border-emerald-900'
                : 'bg-red-950 text-red-500 border border-red-900'
            )}
          >
            {isCurrent ? 'Active' : 'Disabled'}
          </Badge>
        </div>
      )
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <SeasonDataTableRowActions data={row.original} />
  }
]
