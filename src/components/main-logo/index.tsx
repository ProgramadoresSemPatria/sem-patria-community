import appLogo from '@/assets/logo.svg'
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
            <Image src={appLogo} alt="Logo" height={28} width={28} />
          </Link>
        </div>
      ) : (
        <div className="hidden md:flex h-[60px] items-center">
          <Link
            href={appRoutes.dashboard}
            className="flex items-center space-x-2 md:flex mr-4"
          >
            <Image src={appLogo} alt="Logo" height={28} width={28} />
            <span className="text-sm font-bold sm:inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-400">
              Sem Pátria
            </span>
            <span className="font-light tracking-widest text-muted-foreground opacity-75">
              COMM
            </span>
          </Link>
        </div>
      )}
    </>
  )
}

export default MainLogo
