import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const useClassroomTable = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!searchParams.get('tabSelected')) {
      router.push(`${pathname}?tabSelected=classroom`)
    }
  }, [pathname, router, searchParams])

  return {}
}
