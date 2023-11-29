'use client'
import NavOptions from '@/components/nav-options'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { resourcesOptions } from '@/lib/constants'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ResourcesContent = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!searchParams.get('filter')) {
      router.push(`${pathname}?filter=all`)
    }
  }, [])

  return (
    <div className="mt-6">
      <NavOptions options={resourcesOptions} />
      <div className="grid grid-cols-5 gap-x-6 gap-y-9 mt-6">
        <div className="flex flex-col gap-2 p-3 h-full overflow-hidden rounded-lg hover:bg-muted cursor-pointer transition-all ease-in">
          <div className="aspect-video w-64 h-36 rounded-md">
            <AspectRatio ratio={16 / 9}>
              {/* <Image src="..." alt="Image" className="rounded-md object-cover" /> */}
              <div className="bg-white w-full h-full rounded-md object-cover" />
            </AspectRatio>
          </div>
          <div className="text-lg md:text-base font-medium group-hover:text-muted-foreground transition line-clamp-2">
            Trello Clone
          </div>
          <div className="flex flex-wrap items-center gap-x-2">
            <span className="p-1 bg-foreground rounded-md text-xs text-primary-foreground">
              Frontend
            </span>
            <span className="p-1 bg-foreground rounded-md text-xs text-primary-foreground">
              Backend
            </span>
          </div>
          <p className="pt-6 font-medium">Free</p>
        </div>
      </div>
    </div>
  )
}

export default ResourcesContent
