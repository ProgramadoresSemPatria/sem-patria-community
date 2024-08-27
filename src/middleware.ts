import { authMiddleware } from '@clerk/nextjs/server'
import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse
} from 'next/server'

const clerkMiddleware = authMiddleware({
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
  debug: true,
  beforeAuth(req, evt) {
    const userAgent = req.headers.get('user-agent')

    if (userAgent && userAgent.includes('Discordbot/2.0')) {
      if (req.headers.get('authorization') === null) {
        console.log('req', req)
        const res = new NextResponse(null, {
          status: 200,
          headers: {
            'Content-Type': 'text/html',
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
    return NextResponse.next()
  }
})
const CORS_PATHS = ['/api/og/(.*)']

export default async function middleware(
  req: NextRequest,
  evt: NextFetchEvent
) {
  // Apply Clerk's authMiddleware first
  const authResponse = clerkMiddleware(req, evt)

  // If Clerk's authMiddleware returns a response, return it immediately
  if (authResponse) {
    return await authResponse
  }

  // Create a new response object to modify headers
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

  // Handle preflight CORS requests
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

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
