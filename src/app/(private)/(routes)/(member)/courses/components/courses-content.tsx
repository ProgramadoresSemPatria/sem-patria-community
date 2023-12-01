'use client'
import { SkeletonCourseCards } from '@/components/skeletons/skeleton-course-cards'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { validateCourseLevelColor } from '@/lib/utils'
import { Category, Course } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

type CoursesContentProps = {
  categories: Category[]
}

const CoursesContent = ({ categories }: CoursesContentProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
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

  const { data: coursesList, isLoading } = useQuery<AxiosResponse<Course[]>>({
    queryKey: ['courses', { filter: searchParams.get('filter') }],
    queryFn: () => api.get(`/api/courses?filter=${searchParams.get('filter')}`),
    enabled: !!searchParams.get('filter')
  })

  useEffect(() => {
    if (!searchParams.get('filter')) {
      router.push(`${pathname}?filter=all`)
    }
  }, [])

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

      <div className="grid grid-cols-5 gap-x-6 gap-y-9 mt-6">
        {isLoading && <SkeletonCourseCards />}
        {coursesList &&
          coursesList.data.length > 0 &&
          coursesList.data.map(course => (
            <Link
              href={course.courseUrl}
              key={course.id}
              className="flex flex-col gap-2 p-3 h-full overflow-hidden rounded-lg hover:bg-muted cursor-pointer transition-all ease-in"
            >
              <div className="aspect-video w-64 h-36 rounded-md">
                <AspectRatio ratio={16 / 9}>
                  <div className="bg-gradient bg-gradient-to-r dark:from-[#ECE9E6] dark:to-[#FFFFFF] from-[#141E30] to-[#243B55] w-full h-full rounded-md object-cover" />
                </AspectRatio>
              </div>
              <div className="text-lg md:text-base font-medium group-hover:text-muted-foreground transition line-clamp-2">
                {course.name}
              </div>
              <div className="flex flex-wrap items-center gap-x-2">
                <span
                  className={`p-1 ${validateCourseLevelColor(
                    course.level
                  )} rounded-md text-xs font-medium`}
                >
                  {course.level}
                </span>
              </div>
              <p className="pt-6 font-medium">
                {course.isPaid ? 'Paid' : 'Free'}
              </p>
            </Link>
          ))}
        {!isLoading && !coursesList?.data.length && (
          <div className="col-span-full text-muted-foreground font-medium">
            There are no course recommendations at this time.
          </div>
        )}
      </div>
    </div>
  )
}

export default CoursesContent
