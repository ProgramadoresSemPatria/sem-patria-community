import { ImageResponse } from 'next/og'
import { getPost } from '@/actions/post/get-post'
import appLogo from '@/assets/app-logo-light.png'
export const size = {
  width: 900,
  height: 600
}
export const contentType = 'image/png'
export const runtime = 'edge'

export default async function Image({
  params
}: {
  params: { postId: string; slug: string }
}) {
  const post = await getPost(params.postId)
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
