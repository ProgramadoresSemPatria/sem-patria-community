'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import { UserCellAction } from './user-cell-action'

export type UserColumn = {
  id: string
  name: string
  imageUrl: string
  email: string
  subscriptionDate: Date
  lastAccess: Date
  level: string | null
}

export const userColumns: Array<ColumnDef<UserColumn>> = [
  {
    accessorKey: 'name',
    header: 'Full Name',
    cell: cell => {
      return (
        <div className="flex gap-2 items-center">
          <Image
            src={cell.row.original.imageUrl}
            width={30}
            height={30}
            alt={cell.getValue() as string}
            className="rounded-full"
          />
          <span>{`${cell.getValue()}`}</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'subscriptionDate',
    header: 'Subscription Date',
    cell: cell => {
      const date = new Date(cell.getValue() as string)
      return format(date, 'dd/MM/yyyy', {
        locale: ptBR
      })
    }
  },
  {
    accessorKey: 'lastAccess',
    header: 'Last Access',
    cell: cell => {
      const date = new Date(cell.getValue() as string)
      return format(date, 'dd/MM/yyyy', {
        locale: ptBR
      })
    }
  },
  {
    accessorKey: 'level',
    header: 'Level'
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <UserCellAction data={row.original} />
  }
]
