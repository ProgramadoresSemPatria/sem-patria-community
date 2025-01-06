import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    const { searchParams } = request.nextUrl
    const keyword = searchParams.get('keyword')

    if (!keyword) {
      return new NextResponse('Keyword is required', { status: 400 })
    }

    const queryPosts = prismadb.post.findMany({
      where: {
        title: {
          contains: keyword,
          mode: 'insensitive'
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        category: {
          select: {
            name: true
          }
        },
        user: {
          select: {
            username: true
          }
        },
        _count: {
          select: { likes: true }
        }
      }
    })

    const queryUsers = prismadb.user.findMany({
      where: {
        username: {
          contains: keyword,
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        username: true,
        name: true,
        createdAt: true,
        imageUrl: true,
        followers: true
      }
    })

    const [posts, users] = await prismadb.$transaction([queryPosts, queryUsers])

    return NextResponse.json({
      data: {
        items: [...posts, ...users],
        counts: {
          posts: posts.length,
          users: users.length
        }
      },
      meta: {
        keyword,
        searchedAt: new Date().toISOString(),
        totalRecords: posts.length + users.length
      }
    })
  } catch (error) {
    return new NextResponse('Error searching for keyword', { status: 500 })
  }
}
