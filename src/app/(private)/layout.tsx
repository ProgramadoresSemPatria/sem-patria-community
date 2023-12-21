import { getCheckMembership } from '@/actions/auth/get-check-membership'
import MainNav from '@/components/main-nav'
import TopBar from '@/components/top-bar'
import { appRoutes } from '@/lib/constants'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function PrivateLayout({
  children
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  if (!user || !user.username) return redirect(appRoutes.signIn)

  const isMemberOfOrg = await getCheckMembership(user.username)

  if (!isMemberOfOrg) return redirect(appRoutes.root)

  return (
    <div className="flex min-h-screen">
      <MainNav />

      <main className="w-full">
        <TopBar />
        <div className="h-[calc(100vh-60px)] overflow-auto pb-10">
          {children}
        </div>
      </main>
    </div>
  )
}
