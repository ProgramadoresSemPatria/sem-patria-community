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

    return NextResponse.json(pendingApprovalCourses)
  } catch (error) {
    console.log('[GET_NOTIFICATIONS_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    const { courseId, type } = await req.json()

    const updateType = type

    const isInvalidRequest = courseId == null || updateType == null

    if (isInvalidRequest) {
      return new NextResponse('Bad Request', { status: 400 })
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
      await updateCourse()
      return new NextResponse('Approved', { status: 200 })
    }

    if (updateType === 'reject') {
      await deleteCourse()
      return new NextResponse('Rejected', { status: 200 })
    }
  } catch (error) {
    console.log('[PENDING_NOTIFICATIONS_PUT_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
