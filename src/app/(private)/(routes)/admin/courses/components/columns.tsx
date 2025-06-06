'use client'

import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { validateCourseLevelColor, validateIsPendingColor } from '@/lib/utils'
import { type ColumnDef } from '@tanstack/react-table'
import { CourseCellAction } from './course-cell-action'
import { type Category } from '@prisma/client'
import Link from 'next/link'

export type CourseColumn = {
  id: string
  name: string
  courseUrl: string
  level: string
  categoryNames: string[]
  isPaid: boolean
  isPending: boolean
  categories: Category[]
  category: Category
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
          Categories
          <Icons.arrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <span>
        {row.original.categoryNames.map((cat, index) => (
          <Badge key={index} className="m-1 truncate">
            {cat}
          </Badge>
        ))}
      </span>
    )
  },
  {
    accessorKey: 'courseUrl',
    id: 'url',
    header: 'Url',
    cell: ({ row }) => (
      <div className="max-w-[250px] truncate">
        <Link href={row.original.courseUrl} target="_blank" className="">
          {row.original.courseUrl}
        </Link>
      </div>
    )
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
    id: 'Paid',
    header: 'Paid',
    cell: ({ row }) => <span>{row.original.isPaid ? 'Paid' : 'Free'}</span>
  },
  {
    accessorKey: 'isPending',
    id: 'Pending',
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
