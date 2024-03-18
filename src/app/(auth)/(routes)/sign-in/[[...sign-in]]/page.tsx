import Apollo from '@/assets/apollo.png'
import Genesis from '@/assets/genesis.png'
import Hades from '@/assets/hades.png'
import Hefesto from '@/assets/hefesto.png'
import Hermes from '@/assets/hermes.png'
import appLogo from '@/assets/logo.svg'
import Prometeu from '@/assets/prometeu.png'
import Zeus from '@/assets/zeus.png'
import { appRoutes } from '@/lib/constants'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import UserAuthForm from './components/user-auth-form'

export default async function Page({
  searchParams
}: {
  searchParams: {
    redirect_url: string
  }
}) {
  const { redirect_url: redirectUrl } = searchParams
  const { userId } = auth()

  if (userId) return redirect(appRoutes.root)

  const backgroundImages = [
    Apollo.src,
    Genesis.src,
    Hades.src,
    Hefesto.src,
    Hermes.src,
    Prometeu.src,
    Zeus.src
  ]

  return (
    <>
      <div className="container relative h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-slate-950">
            <Image
              src={`${backgroundImages[Math.floor(Math.random() * 6)]}`}
              priority
              width={1280}
              height={843}
              alt="auth-background"
              className="hidden md:block h-[100vh] brightness-50"
            />
          </div>
        </div>
        <div className="p-8 col-span-1">
          <div className="mx-auto flex w-full flex-col sm:w-[350px] h-[70vh]">
            {/* Logo */}
            <div className="flex w-full items-center justify-center">
              <div className="flex items-center space-x-2 md:flex">
                <Image
                  src={appLogo}
                  alt="Logo"
                  height={50}
                  width={50}
                  priority
                />
                <span className=" text-2xl font-bold sm:inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-400">
                  Sem Pátria
                </span>
                <span className="font-light tracking-widest text-muted-foreground opacity-75">
                  COMM
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-4 text-center my-auto">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to community
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access your account
              </p>
              <UserAuthForm redirectUrl={redirectUrl} />
              <p className="text-sm text-muted-foreground">
                If you have any issues logging in, please contact support
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
