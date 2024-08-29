import appLogo from '@/assets/app-logo.png'
import { appRoutes } from '@/lib/constants'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import MainForm from './components/main-form'

export default async function Page({
  searchParams
}: {
  searchParams: {
    redirect_url: string
  }
}) {
  const { redirect_url: redirectUrl } = searchParams
  const { userId } = auth()

  if (userId) return redirect(appRoutes.dashboard)

  const backgroundImages = [
    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 31, 32, 34, 35
  ]

  return (
    <>
      <div className="container relative h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-slate-950">
            <Image
              src={`/login-images/${
                backgroundImages[
                  Math.floor(Math.random() * backgroundImages.length)
                ]
              }.png`}
              priority
              width={1200}
              height={1680}
              alt="auth-background"
              className="hidden md:block h-[100vh] w-full brightness-50 "
            />
          </div>
        </div>
        <div className="p-8 col-span-1">
          <div className="mx-auto flex w-full flex-col sm:w-[350px] h-[90vh] md:h-[70vh] overflow-hidden">
            {/* Logo */}
            <div className="flex w-full items-center justify-center">
              <div className="flex items-center space-x-2 md:flex">
                <Image
                  src={appLogo}
                  alt="Logo"
                  height={200}
                  width={200}
                  priority
                />
              </div>
            </div>
            <MainForm redirectUrl={redirectUrl} />
          </div>
        </div>
      </div>
    </>
  )
}
