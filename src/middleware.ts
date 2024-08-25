import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

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
    const userAgent = req.headers.get('user-agent')

    if (userAgent && userAgent.includes('Discordbot/2.0')) {
      if (req.headers.get('authorization') === null) {
        const res = new NextResponse(null, {
          status: 200,
          headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400'
          }
        })
        console.log('res', res)

        return res
      }
    }
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
