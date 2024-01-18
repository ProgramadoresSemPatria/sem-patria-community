// import genesis from '@/assets/genesis.PNG'
// import hefesto from '@/assets/hefesto.PNG'
// import hermes from '@/assets/hermes.PNG'
// import apollo from '@/assets/apollo.PNG'
// import prometeu from '@/assets/prometeu.PNG'
// import zeus from '@/assets/zeus.PNG'
// import hades from '@/assets/hades.PNG'

import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import Link from 'next/link'
import { CarouselItemsMentorshipList } from '@/lib/constants'

const MentorshipList = () => {
  return (
    <div className="py-6">
      <h1 className="text-xl font-bold mb-4">
        Mentorship Program{' '}
        <span className="bg-gray-800 rounded-lg text-sm p-[6px] ml-4">
          Comming Soon
        </span>{' '}
      </h1>
      <Carousel className="mx-6">
        <CarouselContent>
          {CarouselItemsMentorshipList.map(item => (
            <CarouselItem
              key={item.src}
              className="group relative basis-1/4 md:basis-1/3 lg:basis-1/5 xl:basis-[14.2857143%]"
            >
              <Link href={item.href}>
                <Image
                  className="rounded-lg group-hover:opacity-20"
                  src={item.src}
                  alt={item.title + 'img'}
                  width={200}
                  height={200}
                />
                <div className="absolute hidden group-hover:block top-1/3 left-1/3  text-lg font-black">
                  {item.phase}{' '}
                  <span className="text-purple-600">{item.title}</span>
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
