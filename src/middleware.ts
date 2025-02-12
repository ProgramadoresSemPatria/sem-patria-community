import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

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
