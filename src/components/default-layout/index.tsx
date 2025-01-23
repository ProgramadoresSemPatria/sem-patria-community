import TopBar from '@/components/top-bar'
import { cn } from '@/lib/utils'
import React from 'react'
import { AppSidebar } from '../app-sidebar'

type DefaultLayoutProps = {
  children: React.ReactNode
  className?: string
}

export const DefaultLayout = async ({
  children,
  className
}: DefaultLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
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
