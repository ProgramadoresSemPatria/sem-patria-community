import { createUserInDB } from '@/actions/auth/create-user'
import { getCheckMembership } from '@/actions/auth/get-check-membership'
import { appRoutes } from '@/lib/constants'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function SetupLayout({
  children
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  if (!user?.username) return redirect(appRoutes.signIn)

  const isMemberOfOrg = await getCheckMembership(user.username)
  if (isMemberOfOrg) {
    await createUserInDB(user)
    return redirect(appRoutes.dashboard)
  }

  return <>{children}</>
}
