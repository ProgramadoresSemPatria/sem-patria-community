'use client'
import { DataTable } from '@/components/ui/data-table'
import { columns, type ClassroomModuleColumn } from './columns'
import { useClassroomModuleTable } from './use-classroom-module-table'

type ClassroomModuleTableProps = {
  data: ClassroomModuleColumn[]
}

export const ClassroomModuleTable = ({ data }: ClassroomModuleTableProps) => {
  useClassroomModuleTable()

  return <DataTable searchKey="title" columns={columns} data={data} />
}
