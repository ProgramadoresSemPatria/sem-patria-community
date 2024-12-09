import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    const { searchParams } = new URL(request.url)
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
      }
    })

    const queryUsers = prismadb.user.findMany({
      where: {
        username: {
          contains: keyword,
          mode: 'insensitive'
        }
      }
    })

    const [posts, users] = await prismadb.$transaction([queryPosts, queryUsers])

    const formattedUsers = users.map(user => ({
      id: user.id,
      type: 'Users',
      description: user.username,
      url: `/user/${user.username}`
    }))

    const formattedPosts = posts.map(post => ({
      id: post.id,
      type: 'Forum',
      description: post.title,
      url: `/forum/${post.id}/${post.title}`
    }))

    return NextResponse.json([...formattedUsers, ...formattedPosts])
  } catch (error) {
    console.error('Error searching posts:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
