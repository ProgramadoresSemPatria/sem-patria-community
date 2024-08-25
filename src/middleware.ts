import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

const CORS_ALLOWED_ROUTES = ['/api/og/(.*)', '/forum/(.*)', '/forum/(.*)/(.*)']

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    '/api/webhooks(.*)',
    '/api/auth/(.*)',
    '/api/uploadthing(.*)',
    '/set-password/(.*)',
    '/api/password-recovery(.*)',
    'api/og/(.*)',
    '/forum/(.*)',
    '/forum/(.*)/(.*)'
  ],
  afterAuth(auth, req) {
    const res = NextResponse.next()
    console.log('req', req)

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
    console.log('res', res)

    return res
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
