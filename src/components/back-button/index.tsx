'use client'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

type BackButtonProps = {
  route?: string
  isIcon?: boolean
}
const BackButton = ({ route, isIcon = true }: BackButtonProps) => {
  const router = useRouter()
  return (
    <>
      {isIcon ? (
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            if (route) {
              router.push(route)
              return
            }
            router.back()
          }}
          className="flex items-center justify-center mr-4"
        >
          <Icons.arrowBack className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          variant="link"
          onClick={() => {
            if (route) {
              router.push(route)
              return
            }
            router.back()
          }}
          className="flex items-center justify-center gap-x-2 p-0"
        >
          <Icons.arrowBack className="h-4 w-4" />
          <span>Back</span>
        </Button>
      )}
    </>
  )
}

export default BackButton
