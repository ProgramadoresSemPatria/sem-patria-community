import { DefaultLayout } from '@/components/default-layout'
import { SkeletonCmsPage } from '@/components/skeletons/skeleton-cms-page'
import prismadb from '@/lib/prismadb'
import { Suspense } from 'react'
import { type CourseColumn } from './components/columns'
import CoursesClient from './components/courses-client'

const AdminCoursesPage = async () => {
  const courses = await prismadb.course.findMany({
    include: {
      categories: {
        include: {
          category: true
        }
      },
      category: true
    }
  })

  const formattedCourses: CourseColumn[] = courses.map(item => {
    const categoryNames = [
      ...new Set([
        ...item.categories.map(cat => cat.category.name),
        item.category.name
      ])
    ]

    return {
      id: item.id,
      name: item.name,
      courseUrl: item.courseUrl,
      isPaid: item.isPaid,
      level: item.level,
      categories: item.categories.map(cat => cat.category),
      categoryNames,
      isPending: item.isPending,
      category: item.category
    }
  })

  return (
    <DefaultLayout>
      <Suspense fallback={<SkeletonCmsPage />}>
        <CoursesClient courses={formattedCourses} />
      </Suspense>
    </DefaultLayout>
  )
}

export default AdminCoursesPage
