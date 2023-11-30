import prismadb from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const category = await req.nextUrl.searchParams.get('category')
    const user = await currentUser()

    if (!user) return new NextResponse('Unauthenticated', { status: 401 })

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
