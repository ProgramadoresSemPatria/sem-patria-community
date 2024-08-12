import { ImageResponse } from 'next/og'
import appLogo from '@/assets/app-logo-light.png'
import { type NextRequest } from 'next/server'
import prismadb from '@/lib/prismadb'

const size = {
  width: 1200,
  height: 630
}
export const runtime = 'edge'

export const GET = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  const post = await prismadb.post.findUnique({ where: { id: params.postId } })
  const parsedContent = JSON.parse(post?.content as string)
  const description =
    parsedContent.content?.[0]?.content?.[0]?.text || 'Default description'
  const img = parsedContent.content?.[1]?.attrs?.src || appLogo.src
  const title = post?.title || 'Default Title'
  const altText = `Image for ${title}`
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <h1>{post?.title}</h1>
        <h2>{description}</h2>
        <img src={img} alt={altText} />
      </div>
    ),
    {
      ...size
    }
  )
}
