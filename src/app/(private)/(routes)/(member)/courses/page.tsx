import { DefaultLayout } from '@/components/default-layout'
import Header from '@/components/header'
import { SkeletonCoursePage } from '@/components/skeletons/skeleton-course-page'
import prismadb from '@/lib/prismadb'
import { Suspense } from 'react'
import CoursesContent from './components/courses-content'

const CoursesPage = async () => {
  const categories = await prismadb.category.findMany({
    include: {
      courses: {
        include: {
          course: true
        },
        where: {
          course: {
            isPending: false
          }
        }
      }
    }
  })

  const categoriesWithCourses = categories.filter(
    category => category.courses.length > 0
  )

  return (
    <>
      <DefaultLayout>
        <Header title="Courses" />
        <Suspense fallback={<SkeletonCoursePage />}>
          <CoursesContent categories={categoriesWithCourses} />
        </Suspense>
      </DefaultLayout>
    </>
  )
}

export default CoursesPage
