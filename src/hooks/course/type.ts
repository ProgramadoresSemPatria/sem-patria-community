export type CreateCourseBody = {
  name: string
  categoryId: string
  optionalCategories: string[]
  courseUrl: string
  isPaid: boolean
  level: string
  isPending: boolean
}
