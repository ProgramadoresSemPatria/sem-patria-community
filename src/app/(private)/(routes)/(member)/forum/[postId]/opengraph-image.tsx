// import { ImageResponse } from 'next/og'
// import { getPost } from '@/actions/post/get-post'
// import appLogo from '@/assets/app-logo.png'

// export const runtime = 'edge'

// export const alt = 'About Acme'
// export const size = {
//   width: 1200,
//   height: 630
// }

// export const contentType = 'image/png'

// async function fetchFont() {
//   const fontUrl =
//     'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap'
//   const response = await fetch(fontUrl)
//   const cssText = await response.text()
//   const fontUrlMatch = cssText.match(/url\((https:\/\/[^)]+)\)/)
//   if (fontUrlMatch) {
//     const fontFetch = await fetch(fontUrlMatch[1])
//     return await fontFetch.arrayBuffer()
//   }
// }

// export default async function Image({
//   params
// }: {
//   params: { slug: string; postId: string }
// }) {
//   const post = await getPost(params.postId)
//   const parsedContent = JSON.parse(post?.content as string)
//   const description = parsedContent.content?.[0].content?.[0].text

//   const interFont = await fetchFont()

//   return new ImageResponse(
//     (
//       <div
//         style={{
//           fontSize: 64,
//           background: appLogo.src,
//           color: 'white',
//           width: '100%',
//           height: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           textAlign: 'center',
//           padding: '20px',
//           boxSizing: 'border-box'
//         }}
//       >
//         <h1 style={{ margin: 0, fontSize: '2em' }}>{post?.title}</h1>
//         <p style={{ margin: 0, fontSize: '1.5em' }}>{description}</p>
//       </div>
//     ),
//     {
//       ...size,
//       fonts: [
//         {
//           name: 'Inter',
//           data: interFont as ArrayBuffer,
//           style: 'normal',
//           weight: 400
//         }
//       ]
//     }
//   )
// }
