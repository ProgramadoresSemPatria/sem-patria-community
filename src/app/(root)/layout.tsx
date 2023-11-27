import { getCheckMembership } from '@/actions/get-check-membership'
import { auth, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function SetupLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const user = await currentUser()
  if (!user?.username) redirect('/sign-in')

  const isMemberOfOrg = await getCheckMembership(user.username)

  if (isMemberOfOrg) return redirect('/dashboard')

  return <>{children}</>
}
