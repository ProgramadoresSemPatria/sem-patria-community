import MainNav from '@/components/main-nav'
import TopBar from '@/components/top-bar'
import { cn } from '@/lib/utils'
import React from 'react'

type DefaultLayoutProps = {
  children: React.ReactNode
  className?: string
}

export const DefaultLayout = ({ children, className }: DefaultLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <MainNav />

      <main className="w-full">
        <TopBar />
        <div className="h-[calc(100vh-60px)] overflow-auto pb-10">
          <div className={cn('container pt-6', className)}>{children}</div>
        </div>
      </main>
    </div>
  )
}