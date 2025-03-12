import { appRoutes } from '@/lib/constants'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { Roles } from '@prisma/client'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()
  if (!userId) return redirect(appRoutes.root)
  const user = await prismadb.user.findFirst({
    where: {
      id: userId
    }
  })

  if (!user?.role.includes(Roles.Admin)) return redirect(appRoutes.dashboard)

  return <>{children}</>
}
