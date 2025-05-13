import { DefaultLayout } from '@/components/default-layout'
import Header from '@/components/header'
import NavOptions from '@/components/nav-options'
import { appRoutes, getSettingOptions } from '@/lib/constants'
import prismadb from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs/server'

type ProfileLayoutProps = {
  children?: React.ReactNode
}

export default async function ProfileLayout({ children }: ProfileLayoutProps) {
  const nextUser = await currentUser()
  const user = await prismadb.user.findFirst({
    where: { id: nextUser?.id }
  })
  if (!user) return
  return (
    <>
      <DefaultLayout>
        <Header title="Settings" />

        <NavOptions options={getSettingOptions(appRoutes, user)} />
        <div className="mt-8">{children}</div>
      </DefaultLayout>
    </>
  )
}
