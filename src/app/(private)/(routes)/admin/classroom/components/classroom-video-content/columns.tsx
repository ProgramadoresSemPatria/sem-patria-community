'use client'

import { type Video } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'
import { ClassroomVideoCellAction } from './classroom-video-cell-action'

export type ClassroomVideoColumn = Video

export const columns: Array<ColumnDef<ClassroomVideoColumn>> = [
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      return `${row.original.description ?? '-'}`
    }
  },
  {
    accessorKey: 'url',
    header: 'Embed URL'
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ row }) => {
      return new Date(row.original.createdAt).toLocaleDateString()
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    maxSize: 50,
    cell: ({ row }) => <ClassroomVideoCellAction data={row.original} />
  }
]
