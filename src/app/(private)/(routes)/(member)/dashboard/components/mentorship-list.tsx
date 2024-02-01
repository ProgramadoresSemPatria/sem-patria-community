import { Badge } from '@/components/ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { carouselItemsMentorshipList } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'

const MentorshipList = () => {
  return (
    <div className="py-6">
      <div className="flex items-center gap-x-4 mb-4">
        <h1 className="text-xl font-bold">Mentorship Program</h1>
        <Badge className="m-0">Comming Soon</Badge>
      </div>

      <Carousel className="mx-6">
        <CarouselContent>
          {carouselItemsMentorshipList.map(item => (
            <CarouselItem
              key={item.src}
              className="group relative basis-1/4 md:basis-1/3 lg:basis-1/5 xl:basis-[14.2857143%]"
            >
              <Link href={item.href}>
                <Image
                  className="rounded-lg group-hover:opacity-40"
                  src={item.src}
                  alt={item.title + 'img'}
                  width={200}
                  height={200}
                />
                <div className="absolute hidden top-0 bottom-0 left-0 right-0 group-hover:flex flex-col justify-center text-center">
                  <span>{item.phase}</span>
                  <span className="text-purple-600 font-bold">
                    {item.title}
                  </span>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="xl:hidden" />
        <CarouselNext className="xl:hidden" />
      </Carousel>
    </div>
  )
}

export default MentorshipList
