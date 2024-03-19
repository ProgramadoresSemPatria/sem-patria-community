import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const useClassroomModuleTable = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!searchParams.get('tabSelected')) {
      router.push(`${pathname}?tabSelected=modules`)
    }
  }, [pathname, router, searchParams])

  return {}
}
