import { auth } from '@clerk/nextjs/server'
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

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!params.categoryId) {
      return new NextResponse('Category id is required', { status: 400 })
    }

    const vinculatedCourses = await prismadb.course.findMany({
      where: {
        categoryId: params.categoryId
      }
    })

    const vinculatedPosts = await prismadb.post.findMany({
      where: {
        categoryId: params.categoryId
      }
    })

    if (vinculatedCourses.length || vinculatedPosts.length) {
      let generalCategory = await prismadb.category.findFirst({
        where: {
          name: { contains: 'geral', mode: 'insensitive' }
        }
      })

      if (!generalCategory) {
        generalCategory = await prismadb.category.create({
          data: {
            name: 'Geral'
          }
        })
      }

      if (vinculatedCourses.length) {
        await prismadb.course.updateMany({
          where: {
            categoryId: params.categoryId
          },
          data: {
            categoryId: generalCategory.id
          }
        })
      }

      if (vinculatedPosts.length) {
        await prismadb.post.updateMany({
          where: {
            categoryId: params.categoryId
          },
          data: {
            categoryId: generalCategory.id
          }
        })
      }
    }

    const deletedCategory = await prismadb.category.delete({
      where: {
        id: params.categoryId
      }
    })

    return NextResponse.json(deletedCategory)
  } catch (error) {
    console.error('[CATEGORY_ID_DELETE_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
