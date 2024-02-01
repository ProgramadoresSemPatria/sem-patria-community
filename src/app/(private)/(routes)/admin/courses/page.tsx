import { SkeletonCmsPage } from '@/components/skeletons/skeleton-cms-page'
import prismadb from '@/lib/prismadb'
import { Suspense } from 'react'
import { type CourseColumn } from './components/columns'
import CoursesClient from './components/courses-client'

const AdminCoursesPage = async () => {
  const courses = await prismadb.course.findMany({
    include: {
      category: true
    }
  })

  const formattedCourses: CourseColumn[] = courses.map(item => ({
    id: item.id,
    name: item.name,
    courseUrl: item.courseUrl,
    isPaid: item.isPaid,
    level: item.level,
    categoryId: item.categoryId,
    category: item.category.name,
    isPending: item.isPending
  }))

  return (
    <div className="container flex-col pt-6">
      <Suspense fallback={<SkeletonCmsPage />}>
        <CoursesClient courses={formattedCourses} />
      </Suspense>
    </div>
  )
}

export default AdminCoursesPage
