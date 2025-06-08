import TopBar from '@/components/top-bar'
import { cn } from '@/lib/utils'
import React from 'react'
import { AppSidebar } from '../app-sidebar'
import Loading from '@/app/loading'
import { ensureUsernameCookie } from './ensureUsernameCookie'

type DefaultLayoutProps = {
  children: React.ReactNode
  className?: string
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
