import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest
  // { params }: { params: { categoryId: string } }
) {
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

    return NextResponse.json(post)
  } catch (error) {
    console.log('[POST_POST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  console.log(url)
  try {
    // const { limit, page, categoryName } = z
    //   .object({
    //     limit: z.string(),
    //     page: z.string(),
    //     categoryName: z.string().nullish().optional()
    //   })
    //   .parse({
    //     categoryName: url.searchParams.get('category'),
    //     limit: url.searchParams.get('limit'),
    //     page: url.searchParams.get('page')
    //   })
    const categoryName = url.searchParams.get('category')
    // const limit = url.searchParams.get('limit')
    // const page = url.searchParams.get('page')

    // let whereClause = {}
    // console.log('categoryName', categoryName)

    // if (categoryName) {
    //   whereClause = {
    //     category: {
    //       name: categoryName
    //     }
    //   }
    // }
    // console.log(whereClause)

    const posts = await prismadb.post.findMany({
      // take: limit ? parseInt(limit) : undefined,
      // skip: limit
      //   ? (parseInt(page as string) - 1) * parseInt(limit)
      //   : undefined, // skip should start from 0 for page 1
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        category: true,
        likes: true,
        user: true,
        comments: true
      },
      where: {
        category: {
          name:
            categoryName !== 'All'
              ? (categoryName as string)
              : {
                  not: 'all'
                }
        }
      }
    })
    // console.log('post route get', posts)

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response('Could not fetch posts', { status: 500 })
  }
}
