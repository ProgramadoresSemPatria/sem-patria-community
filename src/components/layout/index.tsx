import MainNav from '@/components/main-nav'
import { UserButton } from '@clerk/nextjs'

type DefaultLayoutProps = {
  children?: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </header>
      {children}
    </div>
  )
}

export default DefaultLayout
