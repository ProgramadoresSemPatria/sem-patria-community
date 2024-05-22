import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import KSUID from 'ksuid'

async function generateKSUID() {
  return (await KSUID.random()).string
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    const { title, content, categoryId } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!content)
      return new NextResponse('Content is required', { status: 400 })

    if (!categoryId)
      return new NextResponse('Category ID is required', { status: 400 })

    const id = await generateKSUID()

    const post = await prismadb.post.create({
      data: {
        id,
        title,
        content,
        categoryId,
        userId
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.log('[POST_POST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  try {
    const { limit, page, categoryName, orderBy } = z
      .object({
        limit: z.string().default('10'),
        page: z.string().default('1'),
        categoryName: z.string().nullish().optional().default('All'),
        orderBy: z
          .enum(['datenew', 'dateold', 'likes'])
          .nullish()
          .optional()
          .default('datenew')
      })
      .parse({
        categoryName: url.searchParams.get('category'),
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
        orderBy: url.searchParams.get('orderBy')
      })

    let orderByClause = {}
    let whereClause = {}

    if (orderBy) {
      switch (orderBy) {
        case 'datenew':
          orderByClause = { id: 'desc' }
          break
        case 'dateold':
          orderByClause = { id: 'asc' }
          break
        case 'likes':
          orderByClause = { likes: { _count: 'desc' } }
          break
        default:
          orderByClause = { id: 'desc' }
      }
    } else {
      orderByClause = { id: 'desc' }
    }

    if (categoryName !== 'All') {
      whereClause = { category: { name: categoryName } }
    }

    const posts = await prismadb.post.findMany({
      take: limit ? parseInt(limit) : undefined,
      skip: limit ? (parseInt(page) - 1) * parseInt(limit) : undefined,
      orderBy: orderByClause,
      include: {
        category: true,
        likes: true,
        user: true,
        comments: true
      },
      where: whereClause
    })

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response('Could not fetch posts', { status: 500 })
  }
}
