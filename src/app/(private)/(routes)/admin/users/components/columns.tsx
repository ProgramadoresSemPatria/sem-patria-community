'use client'

import { Roles } from '@/lib/types'
import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import { UserCellAction } from './user-cell-action'
import UserCellRoles from './user-cell-roles'

export type UserColumn = {
  id: string
  name: string
  imageUrl: string | null
  email: string
  subscriptionDate: Date
  lastAccess: Date | null
  level: string | null
  role: string[] | null
}

export const userColumns: Array<ColumnDef<UserColumn>> = [
  {
    accessorKey: 'name',
    header: 'Full Name',
    cell: cell => {
      return (
        <div className="flex gap-2 items-center">
          <Image
            src={cell.row.original.imageUrl || ''}
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
      if (!cell.getValue()) return 'No data available'

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
    accessorKey: 'role',
    header: 'Roles',
    cell: cell => {
      const rolesMapped = (cell.getValue() as string[]).map(
        (role: string) => Roles[role as keyof typeof Roles]
      )

      return <UserCellRoles roles={rolesMapped} />
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <UserCellAction data={row.original} />
  }
]
