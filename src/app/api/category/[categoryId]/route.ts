import { auth } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

import prismadb from '@/lib/prismadb'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = auth()
    const { name } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!name) return new NextResponse('Name is required', { status: 400 })

    if (!params.categoryId)
      return new NextResponse('Category id is required', { status: 400 })

    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId
      },
      data: {
        name
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORY_ID_PATCH_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!params.categoryId)
      return new NextResponse('Category id is required', { status: 400 })

    const isCoursesVinculated = await prismadb.course.findMany({
      where: {
        categoryId: params.categoryId
      }
    })

    if (isCoursesVinculated)
      await prismadb.course.deleteMany({
        where: {
          categoryId: params.categoryId
        }
      })

    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORY_ID_DELETE_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
