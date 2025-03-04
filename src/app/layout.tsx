import { appConfig } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { AppProviders } from '@/providers/app-provider'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: appConfig.name,
    template: `%s | ${appConfig.name}`
  },
  description: appConfig.description,
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }}
    >
      <html lang="en">
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            inter.className
          )}
        >
          <AppProviders>
            {children}
            <Analytics mode="auto" />
          </AppProviders>
        </body>
      </html>
    </ClerkProvider>
  )
}
