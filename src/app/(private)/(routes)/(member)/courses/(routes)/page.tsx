import Header from '@/components/header'
import { SkeletonCoursePage } from '@/components/skeletons/skeleton-course-page'
import prismadb from '@/lib/prismadb'
import { Suspense } from 'react'
import CoursesContent from '../components/courses-content'

const CoursesPage = async () => {
  const categories = await prismadb.category.findMany()
  return (
    <>
      <Suspense fallback={<SkeletonCoursePage />}>
        <div className="container pt-6">
          <Header title="Courses" />
          <CoursesContent categories={categories} />
        </div>
      </Suspense>
    </>
  )
}

export default CoursesPage
