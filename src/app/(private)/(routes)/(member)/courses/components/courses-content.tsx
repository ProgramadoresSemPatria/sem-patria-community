'use client'

import AdvancedImg from '@/assets/advanced.png'
import BeginnerImg from '@/assets/beginner.png'
import IntermediateImg from '@/assets/intermediate.png'
import { SkeletonCourseCards } from '@/components/skeletons/skeleton-course-cards'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { useCourseContent } from '@/hooks/course/use-course-content'
import { validateCourseLevelColor } from '@/lib/utils'
import { type Category } from '@prisma/client'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'

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

  const renderLevelImage = (level: string) => {
    const levelImage: Record<string, StaticImageData> = {
      beginner: BeginnerImg,
      intermediate: IntermediateImg,
      advanced: AdvancedImg
    }
    return levelImage[level]
  }

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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-9 mt-6">
        {isLoading && <SkeletonCourseCards />}
        {coursesList &&
          coursesList.length > 0 &&
          coursesList.map(course => (
            <Link
              href={course.courseUrl}
              key={course.id}
              className="flex flex-col gap-2 p-3 h-full overflow-hidden rounded-lg hover:bg-muted cursor-pointer transition-all ease-in"
            >
              <div className="aspect-video w-full rounded-md">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={renderLevelImage(course.level)}
                    alt={course.name}
                    className="w-full h-full rounded-md object-cover"
                  />
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
        {!isLoading && !coursesList?.length && (
          <div className="col-span-full text-muted-foreground font-medium">
            There are no course recommendations at this time.
          </div>
        )}
      </div>
    </div>
  )
}

export default CoursesContent
