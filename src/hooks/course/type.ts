export type CreateCourseBody = {
  name: string
  courseUrl: string
  isPaid: boolean
  level: string
  categoryId?: string
  categoryName?: string
  isPending: boolean
}
