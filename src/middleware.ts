import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const staticPublicRoutes = [
  '/api/webhooks(.*)',
  '/api/auth/(.*)',
  '/api/uploadthing(.*)',
  '/set-password/(.*)',
  '/api/password-recovery(.*)',
  '/api/og/(.*)'
]

const isStaticPublicRoute = createRouteMatcher(staticPublicRoutes)

export default clerkMiddleware(
  (auth, req) => {
    const userAgent = req.headers.get('user-agent')
    console.log('user agent', userAgent)
    console.log('req', req)

    const isDiscordBot = userAgent?.toLowerCase().includes('discord')
    console.log('isDiscordBot', isDiscordBot)

    const isForumRoute = req.nextUrl.pathname.startsWith('/forum')
    console.log('isForumRoute', isForumRoute)

    const isPublic = isStaticPublicRoute(req) || (isDiscordBot && isForumRoute)
    console.log('isPublic', isPublic)

    if (!isPublic) {
      auth().protect()
    }
  },
  { debug: true }
)

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
