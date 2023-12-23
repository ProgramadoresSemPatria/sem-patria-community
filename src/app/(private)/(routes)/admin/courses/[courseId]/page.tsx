import prismadb from '@/lib/prismadb'
import { NewCourseForm } from './components/new-course-form'

const NewCoursePage = async ({ params }: { params: { courseId: string } }) => {
  const course = await prismadb.course.findUnique({
    where: { id: params.courseId }
  })

  const categories = await prismadb.category.findMany()

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <NewCourseForm
          initialData={course}
          categories={categories}
          feedback={false}
        />
      </div>
    </div>
  )
}

export default NewCoursePage
