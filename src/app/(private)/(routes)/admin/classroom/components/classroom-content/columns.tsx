'use client'

import { Badge } from '@/components/ui/badge'
import { type Classroom, type ClassroomModule } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'
import { ClassroomCellAction } from './classroom-cell-action'

export type ClassroomColumn = Classroom & {
  modules: ClassroomModule[]
}

export const columns: Array<ColumnDef<ClassroomColumn>> = [
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'modules',
    header: 'Modules',
    cell: ({ row }) => {
      return row.original.modules.map(value => value.title).join(', ')
    }
  },
  {
    accessorKey: 'permissions',
    header: 'Permissions',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 flex-wrap">
          {row.original.permissions.map(value => (
            <Badge key={value}>{value}</Badge>
          ))}
        </div>
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    maxSize: 100,
    cell: ({ row }) => {
      return row.original.createdAt.toLocaleString('pt-BR', {
        dateStyle: 'medium'
      })
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    maxSize: 50,
    cell: ({ row }) => <ClassroomCellAction data={row.original} />
  }
]
