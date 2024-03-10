import { getCheckMembership } from '@/actions/auth/get-check-membership'
import { appRoutes } from '@/lib/constants'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function PrivateLayout({
  children
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  if (!user?.username) return redirect(appRoutes.signIn)

  const isMemberOfOrg = await getCheckMembership(user.username)

  if (!isMemberOfOrg) return redirect(appRoutes.root)

  return <div>{children}</div>
}
