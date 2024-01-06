import { type NotificationProps } from '@/components/top-bar/notifications-button/notifications-list-content'
import { Checkbox } from '@/components/ui/checkbox'
import { validateCourseLevelColor } from '@/lib/utils'
import { format } from 'date-fns'
import ControlButton from './control-button'

type DetailsModalContentProps = {
  content?: NotificationProps
}

const DetailsModalContent = ({ content }: DetailsModalContentProps) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="grid grid-cols-2 gap-x-4">
        <div className="space-y-0.5">
          <h2 className=" font-bold tracking-tight">Course name</h2>
          <p className="text-muted-foreground max-w-[150px]">{content?.name}</p>
        </div>
        <div className="flex items-center gap-2 space-y-0.5">
          <h2 className="font-bold tracking-tight">Is paid</h2>
          <Checkbox checked={content?.} className="cursor-default" />
        </div>
        <div className="space-y-0.5 mt-6">
          <h2 className=" font-bold tracking-tight">Course level</h2>
          <div
            className={`flex items-center w-fit text-sm px-3 py-1 rounded-full ${validateCourseLevelColor(
              content?.level ?? ''
            )}`}
          >
            {content?.level}
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
        <ControlButton type="decline" courseId={course?.id ?? ''} />
        <ControlButton type="approve" courseId={course?.id ?? ''} />
      </div>
    </div>
  )
}

export default DetailsModalContent
