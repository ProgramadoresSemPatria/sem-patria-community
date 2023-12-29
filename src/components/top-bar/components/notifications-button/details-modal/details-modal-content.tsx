import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { type Course } from '@prisma/client'
import { format } from 'date-fns'
import React from 'react'

interface DetailsModalContentProps {
  course: Course | null
}
const courseLevelMap: Record<string, string> = {
  beginner: 'bg-green-500 text-green-800',
  intermediate: 'bg-yellow-500 text-yellow-800',
  advanced: 'bg-red-500 text-red-800'
}

const DetailsModalContent: React.FC<DetailsModalContentProps> = ({
  course
}: DetailsModalContentProps) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="grid grid-cols-2 gap-x-4">
        <div className="space-y-0.5">
          <h2 className=" font-bold tracking-tight">Course name</h2>
          <p className="text-muted-foreground">{course?.name}</p>
        </div>
        <div className="flex items-center gap-2 space-y-0.5">
          <h2 className="font-bold tracking-tight">Is paid</h2>
          <Checkbox checked={course?.isPaid} className="cursor-default" />
        </div>
        <div className="space-y-0.5 mt-6">
          <h2 className=" font-bold tracking-tight">Course level</h2>
          <div
            className={`flex items-center text-muted-foreground w-fit text-sm px-3 py-1 rounded-full ${
              courseLevelMap[course?.level ?? 'beginner']
            }`}
          >
            {course?.level}
          </div>
        </div>
        <div className="space-y-0.5 mt-6">
          <h2 className=" font-bold tracking-tight">Course URL</h2>
          <a
            href={course?.courseUrl}
            target="_blank"
            className="text-muted-foreground underline"
            rel="noreferrer"
          >
            Access course here
          </a>
        </div>
        <div className="space-y-0.5 mt-6">
          <h2 className=" font-bold tracking-tight">Course category</h2>
          <p className="text-muted-foreground">{course?.category?.name}</p>
        </div>
        <div className="space-y-0.5 mt-6">
          <h2 className=" font-bold tracking-tight">Requested at</h2>
          <p className="text-muted-foreground">
            {format(new Date(course?.createdAt ?? new Date()), 'dd/MM/yyyy')}
          </p>
        </div>
      </div>
      <div className="mt-6 flex w-full justify-between">
        <Button variant="destructive">Decline</Button>
        <Button className="bg-green-600 text-primary hover:bg-green-700">
          Approve
        </Button>
      </div>
    </div>
  )
}

export default DetailsModalContent
