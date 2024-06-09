'use client'
import appLogo from '@/assets/app-logo.png'
import appLogoLight from '@/assets/app-logo-light.png'
import { appRoutes } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'

type MainLogoProps = {
  isMobile?: boolean
}

const MainLogo = ({ isMobile }: MainLogoProps) => {
  const { resolvedTheme } = useTheme()
  const logo = resolvedTheme === 'dark' ? appLogo : appLogoLight

  return (
    <>
      {isMobile ? (
        <div className="flex md:hidden h-[60px] w-full items-center">
          <Link
            href={appRoutes.dashboard}
            className="flex items-center space-x-2 md:flex mr-4"
          >
            <Image src={logo} alt="Logo" height={100} width={100} />
          </Link>
        </div>
      ) : (
        <div className="hidden md:flex h-[60px] items-center">
          <Link
            href={appRoutes.dashboard}
            className="flex items-center space-x-2 md:flex mr-4"
          >
            <Image src={logo} alt="Logo" height={100} width={100} />
          </Link>
        </div>
      )}
    </>
  )
}

export default MainLogo
