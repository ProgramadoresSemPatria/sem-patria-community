'use client'
import { mentorshipPrograms } from '@/lib/constants'
import { ClassroomCard } from '../classroom-card'

export const MentorshipSection = () => {
  return (
    <div className="mt-6 flex flex-col gap-y-3">
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {mentorshipPrograms().map(value => (
          <ClassroomCard
            key={value.vimeoProjectId}
            src={value.thumbnail}
            title={value.title}
            chapters={value.chapters}
            progress={value.progress}
          />
        ))}
      </div>
    </div>
  )
}
