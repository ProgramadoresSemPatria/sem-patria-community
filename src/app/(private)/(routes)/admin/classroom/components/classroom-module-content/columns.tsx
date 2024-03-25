'use client'

import { type ClassroomModule } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'
import { ClassroomModuleCellAction } from './classroom-module-cell-action'

export type ClassroomModuleColumn = ClassroomModule & {
  videosAmount: number
  classroom: string
}

export const columns: Array<ColumnDef<ClassroomModuleColumn>> = [
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'videosAmount',
    header: 'Videos',
    cell: ({ row }) => {
      return `${row.original.videosAmount} videos`
    }
  },
  {
    accessorKey: 'classroom',
    header: 'Classroom'
  },
  {
    id: 'actions',
    header: 'Actions',
    maxSize: 50,
    cell: ({ row }) => <ClassroomModuleCellAction data={row.original} />
  }
]
