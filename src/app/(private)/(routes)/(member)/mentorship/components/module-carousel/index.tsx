'use client'

import Hefesto from '@/assets/hefesto.png'
import { Icons } from '@/components/icons'
import { SkeletonMentorshipPage } from '@/components/skeletons/skeleton-mentorship-page'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { toast } from '@/components/ui/use-toast'
import { appRoutes, mentorshipProgramModuleProps } from '@/lib/constants'
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
    videos: Video[]
  }>
  hasPermission: boolean
}

export const ModuleCarousel = ({
  modules,
  hasPermission
}: ModuleCarouselProps) => {
  const { isMounted } = useModuleCarousel()

  if (!isMounted) return <SkeletonMentorshipPage />

  return (
    <Carousel>
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
                  'group basis-1/4 md:basis-1/3 lg:basis-1/5'
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
                  src={
                    mentorshipProgramModuleProps(module.title)?.image ??
                    Hefesto.src
                  }
                  alt={module.title}
                  width={1920}
                  height={1080}
                  className={cn(
                    hasPermission
                      ? 'group-hover:opacity-80'
                      : 'group-hover:opacity-25',
                    'object-cover w-fit rounded'
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
              className="group basis-1/4 md:basis-1/3 lg:basis-1/5"
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
                  src={
                    mentorshipProgramModuleProps(module.title)?.image ??
                    Hefesto.src
                  }
                  alt={module.title}
                  width={1920}
                  height={1080}
                  className={cn(
                    hasPermission
                      ? 'group-hover:opacity-80'
                      : 'group-hover:opacity-25',
                    'object-cover w-fit rounded'
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
      <CarouselPrevious className="xl:hidden" />
      <CarouselNext className="xl:hidden" />
    </Carousel>
  )
}
