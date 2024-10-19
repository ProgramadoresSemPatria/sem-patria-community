import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import axios from 'axios'
import { NextResponse, type NextRequest } from 'next/server'
import slugify from 'slugify'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const { userId } = auth()
    const { postId } = params

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!postId) return new NextResponse('Post id is required', { status: 400 })

    const user = await prismadb.user.findFirst({ where: { id: userId } })
    if (user?.role.includes('Admin')) {
      await prismadb.post.delete({
        where: {
          id: postId
        }
      })
    } else {
      await prismadb.post.delete({
        where: {
          id: postId,
          userId
        }
      })
    }

    return new NextResponse('Post deleted', { status: 200 })
  } catch (error) {
    console.log('[POST_COMMENTS_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const { userId } = auth()
    const postId = params.postId
    const { title, content, categoryId } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    const hasPost = await prismadb.post.findFirst({
      where: {
        id: postId
      }
    })

    if (!hasPost) return new NextResponse('Post not found', { status: 404 })

    if (hasPost.userId !== userId)
      return new NextResponse('Unauthorized', { status: 401 })

    if (!title) return new NextResponse('Title is required', { status: 400 })

    if (!content)
      return new NextResponse('Content is required', { status: 400 })

    if (!categoryId)
      return new NextResponse('Category ID is required', { status: 400 })

    const post = await prismadb.post.update({
      where: {
        id: postId
      },
      data: {
        title,
        content,
        categoryId
      }
    })

    const discordWebHookURL = process.env.DISCORD_WEBHOOK_URL
    if (post && discordWebHookURL) {
      const postSlug = slugify(post.title, { lower: true, strict: true })
      const postLink = `${process.env.BASE_URL_PRODUCTION}/forum/${post.id}/${postSlug}`
      const postWebhookMessageID = post.discordWebhookMessageID
      const response = await axios.patch(
        `${discordWebHookURL}/messages/${postWebhookMessageID}?wait=true`,
        {
          content: `## 🔥 New community post!\n${postLink}`
        }
      )

      if (!response) {
        console.log('[DISCORD_WEBHOOK_ERROR] Discord webhook failed to send')
        return NextResponse.json(post)
      }

      const webhookMessageID = response.data.id
      await prismadb.post.update({
        where: {
          id: postId
        },
        data: {
          discordWebhookMessageID: webhookMessageID
        }
      })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.log('[PUT_POST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
