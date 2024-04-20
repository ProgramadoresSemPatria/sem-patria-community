import appLogo from '@/assets/app-logo.png'
import { appRoutes } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'

type MainLogoProps = {
  isMobile?: boolean
}

const MainLogo = ({ isMobile }: MainLogoProps) => {
  return (
    <>
      {isMobile ? (
        <div className="flex md:hidden h-[60px] w-full items-center">
          <Link
            href={appRoutes.dashboard}
            className="flex items-center space-x-2 md:flex mr-4"
          >
            <Image src={appLogo} alt="Logo" height={100} width={100} />
          </Link>
        </div>
      ) : (
        <div className="hidden md:flex h-[60px] items-center">
          <Link
            href={appRoutes.dashboard}
            className="flex items-center space-x-2 md:flex mr-4"
          >
            <Image src={appLogo} alt="Logo" height={100} width={100} />
          </Link>
        </div>
      )}
    </>
  )
}

export default MainLogo
