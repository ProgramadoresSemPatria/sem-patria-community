'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { validateCourseLevelColor, validateIsPendingColor } from '@/lib/utils'
import { type ColumnDef } from '@tanstack/react-table'
import { CourseCellAction } from './course-cell-action'
import { Icons } from '@/components/icons'

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

export const columns: Array<ColumnDef<CourseColumn>> = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          Category
          <Icons.arrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          Level
          <Icons.arrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
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
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          Pending
          <Icons.arrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { background, text } = validateIsPendingColor(
        row.original.isPending
      )

      return <Badge className={`${background}`}>{text}</Badge>
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CourseCellAction data={row.original} />
  }
]
