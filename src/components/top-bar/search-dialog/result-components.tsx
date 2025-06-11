import { Icons } from '@/components/icons'
import Image from 'next/image'
import { type SearchDialogResult } from '@/hooks/search/types'

interface ResultProps {
  result: SearchDialogResult
}

export const ForumResult = ({ result }: ResultProps) => (
  <>
    <div className="flex flex-shrink-0 items-center justify-center rounded-lg mr-2 w-12 h-12 bg-indigo-500">
      <Icons.forum className="w-6 h-6 text-white" aria-hidden="true" />
    </div>
    <div className="min-w-0 flex-auto overflow-hidden">
      <p className="truncate capitalize font-medium text-gray-900 dark:text-gray-100">
        {result.title}
      </p>
      <div className="mt-0.5 flex items-center gap-x-2 text-xs text-gray-500 dark:text-gray-400">
        <p className="truncate">
          Posted by <strong>@{result.user?.username}</strong> in{' '}
          <strong>{result.category?.name}</strong>
        </p>
        {result._count?.likes && result._count?.likes > 0 && (
          <>
            <svg viewBox="0 0 2 2" className="w-0.5 h-0.5 fill-current">
              <circle r={1} cx={1} cy={1} />
            </svg>
            <div className="flex items-center gap-x-1">
              <Icons.upVote className="w-3.5 h-3.5" />
              {result._count?.likes}
            </div>
          </>
        )}
      </div>
    </div>
  </>
)

export const UserResult = ({ result }: ResultProps) => (
  <>
    <div className="flex flex-shrink-0 items-center justify-center rounded-lg mr-2 w-12 h-12 bg-blue-500">
      {result.imageUrl ? (
        <Image
          alt="User avatar"
          className="rounded-lg"
          width={500}
          height={500}
          src={result.imageUrl}
        />
      ) : (
        <Icons.user className="w-6 h-6 text-white" aria-hidden="true" />
      )}
    </div>
    <div className="min-w-0 flex-auto overflow-hidden">
      <p className="truncate capitalize font-medium text-gray-900 dark:text-gray-100">
        {result.name}
      </p>
      <div className="mt-0.5 flex items-center gap-x-2 text-xs text-gray-500 dark:text-gray-400">
        <p className="truncate">
          <strong>@{result.username}</strong>
        </p>
        <svg viewBox="0 0 2 2" className="w-0.5 h-0.5 fill-current">
          <circle r={1} cx={1} cy={1} />
        </svg>
        <p className="truncate">{result.followers} followers</p>
      </div>
    </div>
  </>
)

const ModulesResult = ({ result }: ResultProps) => {
  return (
    <>
      <div
        id="entity-icon"
        className="flex flex-shrink-0 items-center justify-center rounded-lg mr-2 w-12 h-12 bg-green-500"
      >
        <Icons.classroom className="w-6 h-6 text-white" aria-hidden="true" />
      </div>
      <div id="title" className="min-w-0 flex-auto">
        <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
          {result.title}
        </p>
        <div className="mt-0.5 flex items-center gap-x-2">
          {result.classroom && (
            <p className="truncate text-xs text-gray-500 dark:text-gray-400 max-w-[300px]">
              <strong>Classroom:</strong> {result.classroom.title}
            </p>
          )}
          {result.videos && result.videos.length > 0 && (
            <>
              <svg
                viewBox="0 0 2 2"
                className="flex-shrink-0 w-0.5 h-0.5 fill-current text-gray-500 dark:text-gray-400"
              >
                <circle r={1} cx={1} cy={1} />
              </svg>
              <div className="flex items-center gap-x-1 text-xs text-gray-500 dark:text-gray-400 shrink-0">
                <Icons.video className="w-3.5 h-3.5" /> {result.videos?.length}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
const CourseResult = ({ result }: ResultProps) => (
  <>
    <div
      id="entity-icon"
      className="flex flex-shrink-0 items-center justify-center rounded-lg mr-2 w-12 h-12 bg-yellow-500"
    >
      <Icons.code className="w-6 h-6 text-white" aria-hidden="true" />
    </div>
    <div id="title" className="min-w-0 flex-auto overflow-hidden">
      <p className="truncate capitalize font-medium text-gray-900 dark:text-gray-100">
        {result.name}
      </p>
      <div className="mt-0.5 flex items-center gap-x-2 text-xs/5 text-gray-500 dark:text-gray-400">
        <p className="truncate">
          Category: <strong>{result.category?.name}</strong>
        </p>
        <svg
          viewBox="0 0 2 2"
          className="flex-shrink-0 w-0.5 h-0.5 fill-current"
        >
          <circle r={1} cx={1} cy={1} />
        </svg>
        <p className="truncate">{result.isPaid ? 'Paid' : 'Free'} Course</p>
      </div>
    </div>
  </>
)

const InterestResult = ({ result }: ResultProps) => (
  <>
    <div
      id="entity-icon"
      className="flex flex-shrink-0 items-center justify-center rounded-lg mr-2 w-12 h-12 bg-primary"
    >
      <Icons.list className="w-6 h-6 text-white" aria-hidden="true" />
    </div>
    <div id="title" className="min-w-0 flex-auto overflow-hidden">
      <p className="truncate capitalize font-medium text-gray-900 dark:text-gray-100">
        {result.interest}
      </p>
      <div className="mt-0.5 flex items-center gap-x-2 text-xs/5 text-gray-500 dark:text-gray-400">
        <p className="truncate">
          <strong>{result.users?.length || 0} users</strong>
        </p>
      </div>
    </div>
  </>
)

const EventResult = ({ result }: ResultProps) => (
  <>
    <div
      id="entity-icon"
      className="flex flex-shrink-0 items-center justify-center rounded-lg mr-2 w-12 h-12 bg-sky-500"
    >
      <Icons.calendar className="w-6 h-6 text-white" aria-hidden="true" />
    </div>
    <div id="title" className="min-w-0 flex-auto overflow-hidden">
      <p className="truncate capitalize font-medium text-gray-900 dark:text-gray-100">
        {result.title}
      </p>
      <div className="mt-0.5 flex items-center gap-x-2 text-xs/5 text-gray-500 dark:text-gray-400">
        <p className="truncate">
          <strong>{result.location}</strong>
        </p>
        {result.specialGuest && (
          <>
            <svg
              viewBox="0 0 2 2"
              className="flex-shrink-0 w-0.5 h-0.5 fill-current"
            >
              <circle r={1} cx={1} cy={1} />
            </svg>
            <p className="truncate">
              Special Guest: <strong>{result.specialGuest}</strong>
            </p>
          </>
        )}
      </div>
    </div>
  </>
)

const VideoResult = ({ result }: ResultProps) => (
  <>
    <div className="flex flex-shrink-0 items-center justify-center rounded-lg mr-2 w-12 h-12 bg-red-500">
      <Icons.video className="w-6 h-6 text-white" aria-hidden="true" />
    </div>
    <div id="title" className="min-w-0 flex-auto gap-x-2 overflow-hidden">
      <p className="truncate capitalize font-medium text-gray-900 dark:text-gray-100">
        {result.title}
      </p>
      <div className="mt-0.5 flex items-center text-xs/5 text-gray-500 dark:text-gray-400">
        <p className="truncate">
          <strong>Module:</strong> {result.classroomModule?.title}
        </p>
      </div>
    </div>
  </>
)
type ResultComponentMap = {
  [K in SearchDialogResult['entity']]: React.FC<{ result: SearchDialogResult }>
}
export const resultComponents: ResultComponentMap = {
  forum: ForumResult,
  user: UserResult,
  module: ModulesResult,
  course: CourseResult,
  interest: InterestResult,
  event: EventResult,
  video: VideoResult
}
