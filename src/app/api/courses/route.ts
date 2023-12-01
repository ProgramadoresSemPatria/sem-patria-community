import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth()
    const category = req.nextUrl.searchParams.get('filter')

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    const findedCategory =
      category &&
      (await prismadb.category.findFirst({
        where: {
          name: category
        }
      }))

    const courses = findedCategory
      ? await prismadb.course.findMany({
          where: {
            category: findedCategory
          }
        })
      : await prismadb.course.findMany()

    return NextResponse.json(courses)
  } catch (error) {
    console.log('[COURSES_GET_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    const { name, categoryId, courseUrl, isPaid, level } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!name) return new NextResponse('Name is required', { status: 400 })

    if (!categoryId)
      return new NextResponse('Category id is required', { status: 400 })

    if (!courseUrl)
      return new NextResponse('Course url is required', { status: 400 })

    if (!level) return new NextResponse('Level is required', { status: 400 })

    const course = await prismadb.course.create({
      data: {
        name,
        courseUrl,
        level,
        isPaid,
        categoryId
      }
    })

    return NextResponse.json(course)
  } catch (error) {
    console.log('[COURSES_POST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
