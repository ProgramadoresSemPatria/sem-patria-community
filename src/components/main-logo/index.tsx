'use client'
import { appRoutes } from '@/lib/constants'
import Link from 'next/link'
import Image from 'next/image'
import appLogo from '@/assets/logo.svg'
import React from 'react'
import { usePathname } from 'next/navigation'

type Props = {
  shouldBevisibleInMentoshipPage?: boolean
}
const MainLogo: React.FC<Props> = ({ shouldBevisibleInMentoshipPage }) => {
  const currentPathIncludesMentorship = usePathname().includes('mentorship')

  return (
    <>
      {((shouldBevisibleInMentoshipPage && currentPathIncludesMentorship) ||
        (!shouldBevisibleInMentoshipPage &&
          !currentPathIncludesMentorship)) && (
        <div className="flex h-[60px] w-full items-center">
          <Link
            href={appRoutes.dashboard}
            className="flex items-center space-x-2 md:flex mr-4"
          >
            <Image src={appLogo} alt="Logo" height={40} width={40} />
            <span className=" text-sm font-bold sm:inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-400">
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
