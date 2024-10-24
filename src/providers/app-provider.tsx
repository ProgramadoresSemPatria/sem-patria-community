'use client'

import { Toaster } from '@/components/ui/toaster'
import { ModalProvider } from '@/providers/modal-providers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { SidebarProvider } from '@/components/ui/sidebar'

interface Props {
  children: React.ReactNode
}

const AppProviders = ({ children }: Props) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <ModalProvider />
          <Toaster />
          {children}
        </SidebarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export { AppProviders }
