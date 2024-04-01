// import { appRoutes } from '@/lib/constants'
// import { currentUser } from '@clerk/nextjs'
// import { redirect } from 'next/navigation'

export default async function SetupLayout({
  children
}: {
  children: React.ReactNode
}) {
  // const user = await currentUser()
  // if (!user?.username) return redirect(appRoutes.signIn)

  return <>{children}</>
}
