import TopBar from '@/components/top-bar'
import { cn } from '@/lib/utils'
import React from 'react'
import { AppSidebar } from '../app-sidebar'
import { currentUser } from '@clerk/nextjs/server'
import Loading from '@/app/loading'
import prismadb from '@/lib/prismadb'
import { cookies } from 'next/headers'

type DefaultLayoutProps = {
  children: React.ReactNode
  className?: string
}

export const ensureUsernameCookie = async () => {
  const cookieStore = cookies()
  const existing = cookieStore.get('x-username')
  if (existing) return existing.value
  const user = await currentUser()
  if (!user?.id) return null
  const username =
    user.username ||
    (
      await prismadb.user.findUnique({
        where: { id: user.id },
        select: { username: true }
      })
    )?.username
  if (!username) return null
  return username
}

export const DefaultLayout = async ({
  children,
  className
}: DefaultLayoutProps) => {
  const username = await ensureUsernameCookie()
  if (!username) return <Loading />

  return (
    <div className="flex min-h-screen">
      <AppSidebar userName={username} />
      <main className="w-full md:w-[calc(100%-12rem)] lg:w-full">
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
