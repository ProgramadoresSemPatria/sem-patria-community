import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { IS_READ_ONLY, isBlockedWrite } from '@/lib/read-only'

const staticPublicRoutes = [
  '/api/webhooks(.*)',
  '/api/auth/(.*)',
  '/api/uploadthing(.*)',
  '/set-password/(.*)',
  '/api/password-recovery(.*)',
  '/api/og/(.*)',
  '/sign-in',
  '/api/user/check-pre-psp(.*)'
]

const isStaticPublicRoute = createRouteMatcher(staticPublicRoutes)

export default clerkMiddleware((auth, req) => {
  // Read-only migration lock: block content-writing requests so no new
  // information can be pushed, while login, session, and search keep working.
  if (IS_READ_ONLY && isBlockedWrite(req.method, req.nextUrl.pathname)) {
    return NextResponse.json(
      {
        error: 'A plataforma está em modo somente leitura durante a migração.'
      },
      { status: 403 }
    )
  }

  const userAgent = req.headers.get('user-agent')

  const isMetadataReq = [
    'discord',
    'whatsapp',
    'slackbot',
    'twitterbot',
    'facebook'
  ].some(keyword => userAgent?.toLowerCase().includes(keyword))

  const isForumRoute =
    req.nextUrl.pathname.includes('/forum') ||
    req.nextUrl.href.includes('forum')

  const isPublic = isStaticPublicRoute(req) || (isMetadataReq && isForumRoute)

  if (!isPublic) {
    auth().protect()
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
