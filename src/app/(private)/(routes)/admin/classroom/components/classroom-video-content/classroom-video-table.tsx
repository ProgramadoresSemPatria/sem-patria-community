'use client'

import { DataTable } from '@/components/ui/data-table'
import { columns, type ClassroomVideoColumn } from './columns'
import { useClassroomVideoTable } from './use-classroom-video-table'

type ClassroomVideoTableProps = {
  data: ClassroomVideoColumn[]
}

export const ClassroomVideoTable = ({ data }: ClassroomVideoTableProps) => {
  useClassroomVideoTable()

  return <DataTable searchKey="title" columns={columns} data={data} />
}
