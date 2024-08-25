import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

const CORS_ALLOWED_ROUTES = ['/api/og/(.*)', '/forum/(.*)', '/forum/(.*)/(.*)']

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
  beforeAuth(req, evt) {
    const res = NextResponse.next()
    const userAgent = req.headers.get('user-agent')

    if (userAgent && userAgent.includes('Discordbot/2.0')) {
      console.log('Discord bot detected')
      if (req.headers.get('authorization') === null) {
        console.log('Returning 200 instead of 401 for Discord bot')
        return new NextResponse(null, {
          status: 200,
          headers: {
            'Content-Type': 'text/plain'
          }
        })
      }
    }

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
          },
          status: 200
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
