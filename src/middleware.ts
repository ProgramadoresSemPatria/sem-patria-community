// import { authMiddleware } from '@clerk/nextjs'
// import { NextResponse } from 'next/server'

import { type NextRequest, NextResponse } from 'next/server'

// export default authMiddleware({
//   publicRoutes: [
//     '/api/webhooks(.*)',
//     '/api/auth/(.*)',
//     '/api/uploadthing(.*)',
//     '/set-password/(.*)',
//     '/api/password-recovery(.*)',
//     'api/og/(.*)',
//     '/forum/(.*)',
//     '/forum/(.*)/(.*)'
//   ],
//   beforeAuth(req, evt) {
//     const userAgent = req.headers.get('user-agent')

//     if (userAgent && userAgent.includes('Discordbot/2.0')) {
//       if (req.headers.get('authorization') === null) {
//         console.log('req', req)
//         const res = new NextResponse(null, {
//           status: 200,
//           headers: {
//             'Content-Type': 'text/html',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
//             'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//             'Access-Control-Max-Age': '86400'
//           }
//         })
//         console.log('res', res)

//         return res
//       }
//     }
//     return NextResponse.next()
//   },

// })

// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
// }

const CORS_PATHS = ['/api/og/:path*']

export function middleware(req: NextRequest) {
  const response = NextResponse.next()

  const origin = req.headers.get('origin')

  // Allow CORS only on specific paths
  if (CORS_PATHS.some(path => req.nextUrl.pathname.startsWith(path))) {
    response.headers.set('Access-Control-Allow-Origin', origin || '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )
  }

  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400'
      }
    })
  }

  return response
}
