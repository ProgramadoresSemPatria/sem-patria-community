'use client'

import { NoContent } from '@/components/no-content'
import { SkeletonCourseCards } from '@/components/skeletons/skeleton-course-cards'

import { useCourseContent } from '@/hooks/course/use-course-content'
import { useCourseStore } from '@/hooks/course/use-course-store'
import { type Category } from '@prisma/client'
import Link from 'next/link'
import { CourseCard } from './course-card'
import { CourseFilterOptions } from './course-filter-options'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'

type CoursesContentProps = {
  categories: Category[]
}

const CoursesContent = ({ categories }: CoursesContentProps) => {
  const { pathname, searchParams, isLoading } = useCourseContent()
  const { courseList } = useCourseStore()
  const router = useRouter()

  const categoryOptions =
    categories.length > 0
      ? [
          {
            id: 'all',
            name: 'all'
          },
          ...categories
        ]
      : []

  const handleCategoryChange = (value: string) => {
    router.push(`${pathname}?category=${value}`)
  }

  return (
    <div>
      <div className="flex items-center justify-start flex-wrap w-full gap-2">
        <Select
          defaultValue={searchParams.get('category') ?? 'all'}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map(category => (
              <SelectItem key={category.id} value={category.name}>
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <CourseFilterOptions />
      </div>

      <div className="lg:grid  items-start lg:gap-8 gap-6 mt-6">
        <div className="flex flex-col gap-8">
          {isLoading && <SkeletonCourseCards />}
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 lg:gap-5">
              {!isLoading &&
                courseList &&
                courseList.length > 0 &&
                courseList.map(course => (
                  <Link
                    href={course.courseUrl}
                    key={course.id}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CourseCard courseProps={course} />
                  </Link>
                ))}
            </div>
          </div>
          {!isLoading && !courseList?.length && (
            <NoContent
              title="There is a little trouble."
              description="There are no course recommendations at this time."
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default CoursesContent
