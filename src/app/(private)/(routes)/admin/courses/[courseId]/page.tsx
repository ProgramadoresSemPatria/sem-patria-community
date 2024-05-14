import { DefaultLayout } from '@/components/default-layout'
import prismadb from '@/lib/prismadb'
import { NewCourseForm } from './components/new-course-form'

const NewCoursePage = async ({ params }: { params: { courseId: string } }) => {
  const course = await prismadb.course.findUnique({
    where: { id: params.courseId }
  })

  const categories = await prismadb.category.findMany()

  return (
    <DefaultLayout>
      <NewCourseForm initialData={course} categories={categories} />
    </DefaultLayout>
  )
}

export default NewCoursePage
