'use client'
import { Button } from '@/components/ui/button'
import { appRoutes } from '@/lib/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const SettingsOptions = () => {
  const pathname = usePathname()

  const options = [
    {
      title: 'User',
      href: appRoutes.settings,
      active: pathname === appRoutes.settings
    },
    {
      title: 'Appearance',
      href: appRoutes.appearance,
      active: pathname === appRoutes.appearance
    }
  ]
  return (
    <div className="flex gap-2 items-center">
      {options.map(option => (
        <Link href={option.href} key={option.title}>
          <Button
            className="p-2"
            variant={option.active ? 'secondary' : 'ghost'}
          >
            {option.title}
          </Button>
        </Link>
      ))}
    </div>
  )
}
