'use client'

import DefaultImage from '@/assets/advanced.jpg'
import { Icons } from '@/components/icons'
import { SkeletonMentorshipPage } from '@/components/skeletons/skeleton-mentorship-page'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import { toast } from '@/components/ui/use-toast'
import { appRoutes } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { type Video } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { useModuleCarousel } from './use-module-carousel'

type ModuleCarouselProps = {
  modules: Array<{
    id: string
    title: string
    classroomId: string
    fileUrl?: string
    videos: Video[]
  }>
  hasPermission: boolean
}

export const ModuleCarousel = ({
  modules,
  hasPermission
}: ModuleCarouselProps) => {
  const {
    isMounted,
    carouselApi,
    setCarouselApi,
    handleClickBackward,
    handleClickForward
  } = useModuleCarousel()

  if (!isMounted) return <SkeletonMentorshipPage />

  return (
    <>
      <div className="flex gap-1 absolute right-0">
        <Button
          variant="ghost"
          size="icon"
          disabled={!carouselApi?.canScrollPrev()}
          onClick={handleClickBackward}
        >
          <Icons.arrowBack className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          disabled={!carouselApi?.canScrollNext()}
          onClick={handleClickForward}
        >
          <Icons.arrowRight className="h-6 w-6" />
        </Button>
      </div>
      <Carousel
        setApi={setCarouselApi}
        className="w-full overflow-x-hidden"
        opts={{
          slidesToScroll: 2
        }}
      >
        <CarouselContent>
          {modules.map(module => {
            const hasVideos = module.videos.length
            if (!hasVideos)
              return (
                <CarouselItem
                  key={module.id}
                  className={cn(
                    !hasPermission &&
                      'flex flex-col justify-center items-center relative',
                    'xl:basis-1/4 md:basis-1/3 basis-1/2 cursor-pointer',
                    'transition-transform ease-in-out hover:scale-110 hover:-translate-y-1 duration-300 min-h-[300px]'
                  )}
                  onClick={() => {
                    if (!hasPermission) return
                    return toast({
                      title: 'No Content!',
                      description: 'This module has no content yet.'
                    })
                  }}
                >
                  <Image
                    src={module.fileUrl ?? DefaultImage.src}
                    alt={module.title}
                    width={1920}
                    height={1080}
                    className={cn(
                      hasPermission
                        ? 'group-hover:opacity-80'
                        : 'group-hover:opacity-25',
                      'object-cover w-full rounded max-h-[450px] h-full'
                    )}
                  />
                  {!hasPermission && (
                    <Icons.lock className="h-6 w-6 absolute hidden group-hover:flex flex-col justify-center" />
                  )}
                </CarouselItem>
              )
            return (
              <CarouselItem
                key={module.id}
                className="group xl:basis-1/4 md:basis-1/3 basis-1/2 cursor-pointer transition-transform ease-in-out hover:scale-110 hover:-translate-y-1 duration-300 min-h-[300px]"
              >
                <Link
                  className={`${
                    !hasPermission &&
                    'pointer-events-none flex flex-col justify-center items-center relative'
                  }`}
                  href={`${appRoutes.mentorship}/${module.videos[0].id}`}
                  aria-disabled={!hasPermission}
                >
                  <Image
                    src={module.fileUrl ?? DefaultImage.src}
                    alt={module.title}
                    width={1920}
                    height={1080}
                    className={cn(
                      hasPermission
                        ? 'group-hover:opacity-80'
                        : 'group-hover:opacity-25',
                      'object-cover w-fit rounded max-h-[550px] h-full'
                    )}
                  />
                  {!hasPermission && (
                    <Icons.lock className="h-6 w-6 absolute hidden group-hover:flex flex-col justify-center" />
                  )}
                </Link>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </>
  )
}
