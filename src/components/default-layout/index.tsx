import TopBar from '@/components/top-bar'
import { cn } from '@/lib/utils'
import React from 'react'
import { AppSidebar } from '../app-sidebar'
import { currentUser } from '@clerk/nextjs/server'
import Loading from '@/app/loading'
import prismadb from '@/lib/prismadb'

type DefaultLayoutProps = {
  children: React.ReactNode
  className?: string
}

export const DefaultLayout = async ({
  children,
  className
}: DefaultLayoutProps) => {
  const clerkUser = await currentUser()
  if (!clerkUser) return <Loading />

  const username =
    clerkUser.username ??
    (
      await prismadb.user.findUnique({
        where: { id: clerkUser.id }
      })
    )?.username

  if (!username) return <Loading />

  return (
    <div className="flex min-h-screen">
      <AppSidebar userName={username} />
      <main className="w-full">
        <TopBar />
        <div className="pb-10">
          <div className={cn('mx-auto container pt-6', className)}>
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
