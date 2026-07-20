/**
 * Read-only migration lock.
 *
 * While the platform is being migrated, we freeze all writes so no new
 * information can be pushed into the system. Members can still sign in,
 * keep their session, browse, and search.
 *
 * This module is the single source of truth for the lock. It is imported by
 * both `src/middleware.ts` (server, edge runtime) and `src/lib/api.ts`
 * (client axios interceptor), so it must stay free of Node-only APIs.
 *
 * Toggle: set `NEXT_PUBLIC_READ_ONLY=true` in the environment. Because the
 * value is inlined at build time, changing it requires a redeploy.
 */

export const IS_READ_ONLY = process.env.NEXT_PUBLIC_READ_ONLY === 'true'

const WRITE_METHODS: ReadonlySet<string> = new Set([
  'POST',
  'PUT',
  'PATCH',
  'DELETE'
])

type WriteAllowRule = {
  methods: readonly string[]
  pattern: RegExp
}

/**
 * Write endpoints that must keep working while the platform is read-only,
 * so members can still sign in, keep their session, and search. Everything
 * else that uses a write method against `/api/**` is blocked.
 */
const READ_ONLY_ALLOWED_WRITES: readonly WriteAllowRule[] = [
  // Search uses POST but is a pure read.
  { methods: ['POST'], pattern: /^\/api\/search$/ },
  // Auth / password flows (login must keep working).
  { methods: ['PATCH'], pattern: /^\/api\/auth\/[^/]+$/ },
  { methods: ['POST'], pattern: /^\/api\/password-recovery$/ },
  // Clerk webhook keeps the DB in sync on login / user deletion.
  { methods: ['POST'], pattern: /^\/api\/webhooks\/clerk$/ },
  // UploadThing SDK route handler (uploads themselves are gated by the UI).
  { methods: ['GET', 'POST'], pattern: /^\/api\/uploadthing$/ },
  // Session cookie helpers (needed so browsing keeps working).
  {
    methods: ['POST'],
    pattern: /^\/api\/user\/[^/]+\/set-username-cookie$/
  },
  {
    methods: ['POST'],
    pattern: /^\/api\/user\/[^/]+\/remove-username-cookie$/
  }
]

export const isWriteMethod = (method: string | undefined | null): boolean =>
  WRITE_METHODS.has((method ?? '').toUpperCase())

/**
 * Returns true when a request should be blocked by the read-only lock.
 * Only `/api/**` write requests that are not explicitly allow-listed are
 * blocked; reads, non-API routes, and allow-listed endpoints pass through.
 */
export const isBlockedWrite = (
  method: string | undefined | null,
  pathname: string
): boolean => {
  if (!pathname.startsWith('/api/')) return false
  if (!isWriteMethod(method)) return false

  const upperMethod = (method ?? '').toUpperCase()
  const isAllowed = READ_ONLY_ALLOWED_WRITES.some(
    rule => rule.methods.includes(upperMethod) && rule.pattern.test(pathname)
  )

  return !isAllowed
}
