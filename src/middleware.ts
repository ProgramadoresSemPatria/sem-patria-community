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

export default clerkMiddleware((auth, req) => {
  const userAgent = req.headers.get('user-agent')

  const isDiscordBot = userAgent?.toLowerCase().includes('discord')
  const isForumRoute =
    req.url.startsWith('/forum/') && /\/forum\/.+\/.+/.test(req.url)

  const isPublic = isStaticPublicRoute(req) || (isDiscordBot && isForumRoute)

  if (!isPublic) {
    auth().protect()
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
