import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    const pendingApprovalCourses = await prismadb.course.findMany({
      where: {
        isPending: true
      },
      include: {
        category: true
      }
    })

    const pendingApprovalCategories = await prismadb.category.findMany({
      where: {
        isPending: true
      }
    })

    const pendingContent = {
      courses: pendingApprovalCourses,
      categories: pendingApprovalCategories
    }

    return NextResponse.json(pendingContent)
  } catch (error) {
    console.log('[GET_NOTIFICATIONS_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    const { searchParams } = req.nextUrl

    const courseId = searchParams.get('courseId')
    const categoryId = searchParams.get('categoryId')
    const updateType = searchParams.get('type')

    const isValidRequest =
      updateType !== null && (courseId !== null || categoryId !== null)

    console.log(courseId, categoryId)

    if (!isValidRequest) {
      return new NextResponse('Bad Request', { status: 400 })
    }
    if (courseId == null || updateType == null) {
      return new NextResponse('Bad Request', { status: 400 })
    }

    const updateCategory = async () => {
      if (categoryId) {
        await prismadb.category.update({
          where: {
            id: categoryId
          },
          data: {
            isPending: false
          }
        })
      }
    }

    const updateCourse = async () => {
      if (courseId) {
        await prismadb.course.update({
          where: {
            id: courseId
          },
          data: {
            isPending: false
          }
        })
      }
    }

    const deleteCategory = async () => {
      if (categoryId) {
        await prismadb.category.delete({
          where: {
            id: categoryId
          }
        })
      }
    }

    const deleteCourse = async () => {
      if (courseId) {
        await prismadb.course.delete({
          where: {
            id: courseId
          }
        })
      }
    }

    if (updateType === 'approve') {
      await Promise.all([updateCategory(), updateCourse()])
      return new NextResponse('Approved', { status: 200 })
    }

    if (updateType === 'reject') {
      await Promise.all([deleteCategory(), deleteCourse()])
      return new NextResponse('Rejected', { status: 204 })
    }
  } catch (error) {
    console.log('[PENDING_COURSES_PUT_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
