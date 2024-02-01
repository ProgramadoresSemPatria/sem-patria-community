'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export type NavOptionsProps = {
  options: Array<{
    title: string
    href: string
    param?: {
      key: string
      value: string
    }
  }>
}

const NavOptions = ({ options }: NavOptionsProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <div className="flex gap-2 items-center">
      {options.map(option => (
        <Link href={option.href} key={option.title}>
          {option.param ? (
            <Button
              className="p-2"
              variant={
                searchParams.get(option.param.key) === option.param.value
                  ? 'secondary'
                  : 'ghost'
              }
            >
              {option.title}
            </Button>
          ) : (
            <Button
              className="p-2"
              variant={pathname === option.href ? 'secondary' : 'ghost'}
            >
              {option.title}
            </Button>
          )}
        </Link>
      ))}
    </div>
  )
}

export default NavOptions
