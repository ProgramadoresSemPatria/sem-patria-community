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

export default clerkMiddleware((auth, req, event) => {
  const userAgent = req.headers.get('user-agent')

  // Check if the user agent includes 'Discord' and if the request is for a /forum/(.*)/(.*) route
  const isDiscordBot = userAgent?.includes('Discord')
  const isForumRoute =
    req.url.startsWith('/forum/') && /\/forum\/.*\/.*/.test(req.url)

  // Adjust the public route logic dynamically
  if (isStaticPublicRoute(req) || (isDiscordBot && isForumRoute)) {
    // Allow access without protection for public routes and Discord accessing /forum/(.*)/(.*)
    return
  }
  if (!isStaticPublicRoute(req)) {
    auth().protect()
  }
})
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
