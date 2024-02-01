import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    const { name } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!name) return new NextResponse('Name is required', { status: 400 })

    const category = await prismadb.category.create({
      data: {
        name
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORIES_POST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    const categories = await prismadb.category.findMany()

    return NextResponse.json(categories)
  } catch (error) {
    console.log('[CATEGORIES_GET_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
