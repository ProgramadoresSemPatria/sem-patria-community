import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import axios from 'axios'
import KSUID from 'ksuid'
import { NextResponse, type NextRequest } from 'next/server'
import slugify from 'slugify'
import { z } from 'zod'

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

    const discordWebHookURL = process.env.DISCORD_WEBHOOK_URL
    if (post && discordWebHookURL) {
      const postSlug = slugify(post.title, { lower: true, strict: true })
      const postLink = `${process.env.BASE_URL_PRODUCTION}/forum/${post.id}/${postSlug}`
      const response = await axios.post(`${discordWebHookURL}?wait=true`, {
        content: `## 🔥 New community post!\n${postLink}`
      })

      if (!response) {
        console.log('[DISCORD_WEBHOOK_ERROR] Discord webhook failed to send')
        return NextResponse.json(post)
      }

      const webhookMessageID = response.data.id

      await prismadb.post.update({
        where: {
          id
        },
        data: {
          discordWebhookMessageID: webhookMessageID
        }
      })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.log('[POST_POST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  try {
    const { limit, page, categoryName, orderBy, search } = z
      .object({
        limit: z.string().default('10'),
        page: z.string().default('1'),
        categoryName: z.string().nullish().optional().default('All'),
        orderBy: z
          .enum(['datenew', 'dateold', 'likes'])
          .nullish()
          .optional()
          .default('datenew'),
        search: z.string().nullish().optional()
      })
      .parse({
        categoryName: url.searchParams.get('category'),
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
        orderBy: url.searchParams.get('orderBy'),
        search: url.searchParams.get('search')
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

    if (search) {
      whereClause = {
        OR: [{ title: { contains: search, mode: 'insensitive' } }]
      }
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
