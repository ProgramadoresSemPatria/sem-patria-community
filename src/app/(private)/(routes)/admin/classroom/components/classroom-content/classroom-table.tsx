'use client'
import { DataTable } from '@/components/ui/data-table'
import { columns, type ClassroomColumn } from './columns'
import { useClassroomTable } from './use-classroom-table'

type ClassroomTableProps = {
  data: ClassroomColumn[]
}

export const ClassroomTable = ({ data }: ClassroomTableProps) => {
  useClassroomTable()

  return <DataTable searchKey="title" columns={columns} data={data} />
}
