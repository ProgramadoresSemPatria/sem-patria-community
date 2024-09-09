import { auth } from '@clerk/nextjs/server'
import { type NextRequest, NextResponse } from 'next/server'

import prismadb from '@/lib/prismadb'
import { type Category } from '@prisma/client'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth()
    const { name, category, categories, courseUrl, isPaid, level, isPending } =
      await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!category.id)
      return new NextResponse('Category id is required', { status: 400 })

    if (!courseUrl)
      return new NextResponse('Course url is required', { status: 400 })

    if (!level) return new NextResponse('Level is required', { status: 400 })

    if (!name) return new NextResponse('Name is required', { status: 400 })

    if (!params.courseId)
      return new NextResponse('Course id is required', { status: 400 })

    await prismadb.course.update({
      where: {
        id: params.courseId
      },
      data: {
        categories: {
          deleteMany: {}
        }
      }
    })

    const course = await prismadb.course.update({
      where: {
        id: params.courseId
      },
      data: {
        name,
        courseUrl,
        level,
        isPaid,
        isPending,
        categoryId: category.id,
        categories: {
          create: categories.map((category: Category) => ({
            category: {
              connect: { id: category.id }
            }
          }))
        }
      }
    })

    return NextResponse.json(course)
  } catch (error) {
    console.log('[COURSE_ID_PATCH_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!params.courseId)
      return new NextResponse('Course id is required', { status: 400 })

    const course = await prismadb.course.deleteMany({
      where: {
        id: params.courseId
      }
    })

    return NextResponse.json(course)
  } catch (error) {
    console.log('[COURSE_ID_DELETE_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
