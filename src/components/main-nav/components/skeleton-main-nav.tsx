import appLogo from '@/assets/logo.svg'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { v4 as uuid } from 'uuid'

export const SkeletonMainNav = () => {
  return (
    <div className="hidden h-screen w-[250px] flex-shrink-0 flex-col justify-between border-r border-slate-6 px-4 pb-6 md:flex">
      <div className="flex h-[60px] items-center">
        <div className="hidden items-center space-x-2 md:flex mr-4">
          <Image src={appLogo} alt="Logo" height={40} width={40} />
          <span className="hidden text-sm font-bold sm:inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-400">
            Sem Pátria
          </span>
          <span className="font-light tracking-widest text-muted-foreground opacity-75">
            COMM
          </span>
        </div>
      </div>
      <nav className="mt-6 flex-1">
        <ul className="flex flex-col gap-4">
          {Array.from({ length: 6 }).map(row => (
            <Skeleton key={uuid()} className="px-2 w-2/3 h-6 rounded-sm " />
          ))}
        </ul>
      </nav>
    </div>
  )
}
