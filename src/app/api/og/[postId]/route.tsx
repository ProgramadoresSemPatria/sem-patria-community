import { getPost } from '@/actions/post/get-post'
import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'
import appLogo from '@/assets/app-logo-light.png'

export const runtime = 'edge'

const interBold = fetch(
  new URL('@/assets/fonts/Inter-Bold.ttf', import.meta.url)
  // eslint-disable-next-line @typescript-eslint/promise-function-async
).then(res => res.arrayBuffer())

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const post = await getPost(params.postId)
    const parsedContent = JSON.parse(post?.content as string)
    const description = parsedContent.content?.[0]?.content?.[0]?.text || ''
    const img = parsedContent.content?.[1]?.attrs?.src || appLogo.src
    const title = post?.title || ''
    const altText = `Imageeeee for ${title}`
    const fontBold = await interBold

    console.log('ola')

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: 'black',
            backgroundSize: '150px 150px',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              justifyItems: 'center'
            }}
          >
            <img
              alt={altText}
              height={200}
              src={img}
              style={{ margin: '0 30px' }}
              width={232}
            />
          </div>
          <div
            style={{
              fontSize: 60,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              color: 'white',
              marginTop: 30,
              padding: '0 120px',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap'
            }}
          >
            {title}
            {description}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontBold,
            weight: 700,
            style: 'normal'
          }
        ]
      }
    )
  } catch (error) {
    console.log('[GET_OG_IMAGE_ERROR]', error)
    return new Response(`Failed to generate the image`, {
      status: 500
    })
  }
}
