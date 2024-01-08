import { type Course } from '@prisma/client'

export type NoficationApiProps = Course[]

export type ApproveOrDeclineContentBody = {
  courseId: string
  type: 'approve' | 'reject'
}
