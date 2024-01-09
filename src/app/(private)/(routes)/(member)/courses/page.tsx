import Header from '@/components/header'
import { SkeletonCoursePage } from '@/components/skeletons/skeleton-course-page'
import prismadb from '@/lib/prismadb'
import { Suspense } from 'react'
import CoursesContent from './components/courses-content'

const CoursesPage = async () => {
  const categories = await prismadb.category.findMany({
    include: {
      courses: {
        where: {
          isPending: false
        }
      }
    }
  })

  const categoriesWithCourses = categories.filter(
    category => category.courses.length > 0
  )

  return (
    <>
      <Suspense fallback={<SkeletonCoursePage />}>
        <div className="container pt-6">
          <Header title="Courses" />
          <CoursesContent categories={categoriesWithCourses} />
        </div>
      </Suspense>
    </>
  )
}

export default CoursesPage
