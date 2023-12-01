'use client'

import { Category } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { CourseCellAction } from './course-cell-action'
import { Badge } from '@/components/ui/badge'
import { validateCourseLevelColor } from '@/lib/utils'

export type CourseColumn = {
  id: string
  name: string
  courseUrl: string
  level: string
  category: string
  isPaid: boolean
}

export const columns: ColumnDef<CourseColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => (
      <span>
        {row.original.category.charAt(0).toUpperCase() +
          row.original.category.slice(1)}
      </span>
    )
  },
  {
    accessorKey: 'courseUrl',
    header: 'Url'
  },
  {
    accessorKey: 'level',
    header: 'Level',
    cell: ({ row }) => (
      <Badge className={`${validateCourseLevelColor(row.original.level)}`}>
        {row.original.level}
      </Badge>
    )
  },

  {
    accessorKey: 'isPaid',
    header: 'Paid',
    cell: ({ row }) => <span>{row.original.isPaid ? 'Paid' : 'Free'}</span>
  },
  {
    id: 'actions',
    cell: ({ row }) => <CourseCellAction data={row.original} />
  }
]
