'use client'

import { Category } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { CourseCellAction } from './course-cell-action'
import { Badge } from '@/components/ui/badge'
import { validateCourseLevelColor } from '@/lib/utils'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export type CourseColumn = {
  id: string
  name: string
  courseUrl: string
  level: string
  category: string
  isPaid: boolean
  isPending: boolean
  categoryId?: string
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
    accessorKey: 'isPending',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Pending
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <span>{row.original.isPending ? 'Yes' : 'No'}</span>
  },
  {
    id: 'actions',
    cell: ({ row }) => <CourseCellAction data={row.original} />
  }
]
