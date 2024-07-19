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
    const courses = await prismadb.course.findMany({
      where: {
        isPending: false,
        ...(levels && { level: { in: levels } }),
        ...(availabilityParam && { isPaid: availabilityParam !== 'free' }),
        ...(findedCategory && {
          OR: [
            { categoryId: findedCategory.id },
            {
              categories: {
                some: {
                  categoryId: findedCategory.id
                }
              }
            }
          ]
        })
      },
      include: {
        categories: {
          include: {
            category: true
          }
        },
        category: true
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
    const { name, categoryIds, courseUrl, isPaid, level, isPending } =
      await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!name) return new NextResponse('Name is required', { status: 400 })

    if (!courseUrl)
      return new NextResponse('Course url is required', { status: 400 })

    if (!level) return new NextResponse('Level is required', { status: 400 })

    if (categoryIds?.length) {
      const categoriesExist = await prismadb.category.findMany({
        where: {
          id: { in: categoryIds }
        }
      })
      if (categoriesExist.length !== categoryIds.length) {
        return new NextResponse('One or more categories are invalid', {
          status: 400
        })
      }
    }
    const course = await prismadb.course.create({
      data: {
        name,
        courseUrl,
        level,
        isPaid: !!isPaid,
        isPending: !!isPending,
        categoryId: categoryIds[0],
        categories: {
          create: categoryIds.map((categoryId: string) => ({
            category: {
              connect: { id: categoryId }
            }
          }))
        }
      }
    })

    return NextResponse.json(course)
  } catch (error) {
    console.log('[COURSES_POST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
