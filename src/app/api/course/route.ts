import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth()
    const categoryParam = req.nextUrl.searchParams.get('category')
    const levelParam = req.nextUrl.searchParams.get('level')
    const availabilityParam = req.nextUrl.searchParams.get('availability')

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    const findedCategory =
      categoryParam &&
      (await prismadb.category.findFirst({
        where: {
          name: categoryParam
        }
      }))

    const levels = levelParam ? levelParam.split(',') : undefined
    const courses = findedCategory
      ? await prismadb.course.findMany({
          where: {
            category: findedCategory,
            level: {
              in: levels
            },
            isPaid: availabilityParam
              ? availabilityParam !== 'free'
              : undefined,
            isPending: false
          }
        })
      : await prismadb.course.findMany({
          where: {
            level: {
              in: levels
            },
            isPaid: availabilityParam
              ? availabilityParam !== 'free'
              : undefined,
            isPending: false
          }
        })

    return NextResponse.json(courses)
  } catch (error) {
    console.log('[COURSES_GET_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    const {
      name,
      categoryId,
      courseUrl,
      isPaid,
      level,
      isPending,
      categoryName
    } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!name) return new NextResponse('Name is required', { status: 400 })

    if (!courseUrl)
      return new NextResponse('Course url is required', { status: 400 })

    if (!level) return new NextResponse('Level is required', { status: 400 })

    if (categoryName) {
      const category = await prismadb.category.create({
        data: {
          name: categoryName
        }
      })

      const course = await prismadb.course.create({
        data: {
          name,
          courseUrl,
          level,
          isPaid,
          categoryId: category.id,
          isPending
        }
      })

      return NextResponse.json(course)
    }

    const course = await prismadb.course.create({
      data: {
        name,
        courseUrl,
        level,
        isPaid,
        categoryId,
        isPending
      }
    })

    return NextResponse.json(course)
  } catch (error) {
    console.log('[COURSES_POST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
