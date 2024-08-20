import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

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
    '/forum/(.*)',
    '/forum/(.*)/(.*)'
  ],
  authorizedParties: ['https://discordapp.com'],
  beforeAuth(req, evt) {
    const userAgent = req.headers.get('user-agent')
    if (userAgent?.includes('Discordbot')) {
      console.log('let discord accesss', req)
      return NextResponse.next()
    }
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
