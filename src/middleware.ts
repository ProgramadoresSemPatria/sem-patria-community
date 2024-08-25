// // import { authMiddleware } from '@clerk/nextjs'
// import { type NextRequest, NextResponse } from 'next/server'

// const CORS_ALLOWED_ROUTES = ['/api/og/(.*)']

// // This example protects all routes including api/trpc routes
// // Please edit this to allow other routes to be public as needed.
// // See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
// // export default authMiddleware({
// //   publicRoutes: [
// //     '/api/webhooks(.*)',
// //     '/api/auth/(.*)',
// //     '/api/uploadthing(.*)',
// //     '/set-password/(.*)',
// //     '/api/password-recovery(.*)',
// //     'api/og/(.*)',
// //     '/forum/(.*)',
// //     '/forum/(.*)/(.*)'
// //   ]
// // })

// export function middleware(req: NextRequest) {
//   const res = NextResponse.next()

//   if (
//     CORS_ALLOWED_ROUTES.some(path =>
//       new RegExp(path).test(req.nextUrl.pathname)
//     )
//   ) {
//     res.headers.set('Access-Control-Allow-Origin', '*')
//     res.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
//     res.headers.set(
//       'Access-Control-Allow-Headers',
//       'Content-Type, Authorization'
//     )

//     if (req.method === 'OPTIONS') {
//       return new NextResponse(null, {
//         headers: {
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
//           'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//           'Access-Control-Max-Age': '86400'
//         }
//       })
//     }
//   }

//   return res
// }

// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
// }

import { authMiddleware } from '@clerk/nextjs'
import {
  type NextFetchEvent,
  NextResponse,
  type NextRequest
} from 'next/server'

const CORS_ALLOWED_ROUTES = ['/api/og/(.*)']
const clerkMiddleware = async (req: NextRequest, event: NextFetchEvent) => {
  return await authMiddleware({
    publicRoutes: [
      '/api/webhooks(.*)',
      '/api/auth/(.*)',
      '/api/uploadthing(.*)',
      '/set-password/(.*)',
      '/api/password-recovery(.*)',
      '/api/og/(.*)',
      '/forum/(.*)',
      '/forum/(.*)/(.*)'
    ]
  })(req, event)
}

function customMiddleware(req: NextRequest) {
  const res = NextResponse.next()

  if (
    CORS_ALLOWED_ROUTES.some(path =>
      new RegExp(path).test(req.nextUrl.pathname)
    )
  ) {
    res.headers.set('Access-Control-Allow-Origin', '*')
    res.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    res.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )

    if (req.method === 'OPTIONS') {
      return new NextResponse(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400'
        }
      })
    }
  }

  return res
}

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const clerkResponse = clerkMiddleware(req, event)

  if (clerkResponse) {
    return await clerkResponse
  }

  return customMiddleware(req)
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
