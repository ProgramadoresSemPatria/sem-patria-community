'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { type ClassroomModule } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
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
    accessorKey: 'fileUrl',
    header: 'Image',
    cell: ({ row }) => {
      return (
        <>
          {row.original.fileUrl ? (
            <Link
              href={row.original.fileUrl}
              target="_blank"
              className="flex items-center cursor-default"
            >
              <Button variant="link" className="m-0 p-0">
                View image
                <Icons.redirect className="h-4 w-4 ml-2 text-white" />
              </Button>
            </Link>
          ) : (
            '-'
          )}
        </>
      )
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    maxSize: 50,
    cell: ({ row, cell }) => (
      <ClassroomModuleCellAction data={row.original} cell={cell} />
    )
  }
]
