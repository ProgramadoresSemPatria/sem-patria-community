import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { redis } from '@/lib/redis'
export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    const { title, content, categoryId } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!content)
      return new NextResponse('Content is required', { status: 400 })

    if (!categoryId)
      return new NextResponse('Category ID is required', { status: 400 })

    const post = await prismadb.post.create({
      data: {
        title,
        content,
        categoryId,
        userId
      }
    })
    await redis.zadd('posts', {
      score: new Date(post.createdAt).getMilliseconds(),
      member: JSON.stringify(post)
    })

    // await redis.lpush('posts', JSON.stringify(post))

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
          orderByClause = { createdAt: 'desc' }
          break
        case 'dateold':
          orderByClause = { createdAt: 'asc' }
          break
        case 'likes':
          orderByClause = { likes: { _count: 'desc' } }
          break
        default:
          orderByClause = { createdAt: 'desc' }
      }
    } else {
      orderByClause = { createdAt: 'desc' }
    }

    if (categoryName !== 'All') {
      whereClause = { category: { name: categoryName } }
    }
    const cachedPosts = await redis.zrange('posts', 0, -1)
    let posts
    if (cachedPosts.length > 0) {
      posts = cachedPosts
        .map(post => JSON.parse(post as string))
        .filter(
          post => categoryName !== 'All' && post.category.name === categoryName
        )
    }
    if (!posts || posts.length < Number(limit)) {
      posts = await prismadb.post.findMany({
        take: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit),
        orderBy: orderByClause,
        include: {
          category: true,
          likes: true,
          user: true,
          comments: true
        },
        where: whereClause
      })

      // Optionally refresh the cache
      //   posts.forEach(
      //     async post =>
      //       await redis.zadd('posts', {
      //         score: new Date(post.createdAt).getTime(),
      //         member: JSON.stringify(post)
      //       })
      //   )
    }

    // const posts = await prismadb.post.findMany({
    //   take: limit ? parseInt(limit) : undefined,
    //   skip: limit ? (parseInt(page) - 1) * parseInt(limit) : undefined,
    //   orderBy: orderByClause,
    //   include: {
    //     category: true,
    //     likes: true,
    //     user: true,
    //     comments: true
    //   },
    //   where: whereClause
    // })

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response('Could not fetch posts', { status: 500 })
  }
}
