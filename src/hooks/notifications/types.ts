import { type Category, type Course } from '@prisma/client'

export type NoficationsApiProps = {
  courses: Course[]
  categories: Category[]
}
