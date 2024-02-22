'use client'

import { SkeletonCourseCards } from '@/components/skeletons/skeleton-course-cards'
import { Button } from '@/components/ui/button'
import { useCourseContent } from '@/hooks/course/use-course-content'
import { type Category } from '@prisma/client'
import Link from 'next/link'
import { CourseCard } from './course-card'
import { CourseFilterOptions } from './course-filter-options'

type CoursesContentProps = {
  categories: Category[]
}

const CoursesContent = ({ categories }: CoursesContentProps) => {
  const { pathname, searchParams, isLoading, coursesList } = useCourseContent()

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

  return (
    <div className="mt-6">
      <div className="flex items-center flex-wrap w-full gap-x-2">
        {categoryOptions.map(category => (
          <Link key={category.id} href={`${pathname}?filter=${category.name}`}>
            <Button
              className="p-2"
              variant={
                searchParams.get('filter') === category.name
                  ? 'secondary'
                  : 'ghost'
              }
            >
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </Button>
          </Link>
        ))}
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_280px] items-start lg:gap-8 gap-6 mt-6">
        <div className="flex flex-col gap-8">
          {isLoading && <SkeletonCourseCards />}
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 lg:gap-5">
              {coursesList &&
                coursesList.length > 0 &&
                coursesList.map(course => (
                  <Link href={course.courseUrl} key={course.id}>
                    <CourseCard courseProps={course} />
                  </Link>
                ))}
            </div>
          </div>
          {!isLoading && !coursesList?.length && (
            <div className="col-span-full text-muted-foreground font-medium">
              There are no course recommendations at this time.
            </div>
          )}
        </div>
        <CourseFilterOptions />
      </div>
    </div>
  )
}

export default CoursesContent
