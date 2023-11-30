import Header from '@/components/header'
import prismadb from '@/lib/prismadb'
import { Suspense } from 'react'
import CoursesContent from '../components/courses-content'
import { SkeletonCourseCards } from '../components/skeleton-course-cards'

const CoursesPage = async () => {
  const categories = await prismadb.category.findMany()
  return (
    <>
      <Suspense fallback={<SkeletonCourseCards />}>
        <Header title="Courses" />
        <CoursesContent categories={categories} />
      </Suspense>
    </>
  )
}

export default CoursesPage
