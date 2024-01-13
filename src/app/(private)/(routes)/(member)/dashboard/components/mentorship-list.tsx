import genesis from '@/assets/genesis.png'
import hefesto from '@/assets/hefesto.png'
import hermes from '@/assets/hermes.png'
import apollo from '@/assets/apollo.png'
import prometeu from '@/assets/prometeu.png'
import zeus from '@/assets/zeus.png'
import hades from '@/assets/hades.png'

import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import Link from 'next/link'

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
          <CarouselItem className="group relative basis-1/4 md:basis-1/3 lg:basis-1/5 xl:basis-[14.2857143%]">
            <Link href="/">
              <Image
                className="rounded-lg group-hover:opacity-20"
                src={genesis.src}
                alt="hades img"
                width={200}
                height={200}
              />
              <div className="absolute hidden group-hover:block top-1/3 left-1/3  text-lg font-black">
                Phase 1 <span className="text-purple-600">GENESIS</span>
              </div>
            </Link>
          </CarouselItem>
          <CarouselItem className="group relative basis-1/4 md:basis-1/3 lg:basis-1/5 xl:basis-[14.2857143%]">
            <Link href="/">
              {' '}
              <Image
                className="rounded-lg group-hover:opacity-20"
                src={hefesto.src}
                alt="hades img"
                width={200}
                height={200}
              />
              <div className="absolute hidden group-hover:block top-1/3 left-1/3  text-lg font-black">
                Phase 2 <span className="text-purple-600">HEFESTO</span>
              </div>
            </Link>
          </CarouselItem>
          <CarouselItem className="group relative basis-1/4 md:basis-1/3 lg:basis-1/5 xl:basis-[14.2857143%]">
            <Link href="/">
              <Image
                className="rounded-lg group-hover:opacity-20"
                src={hermes.src}
                alt="hades img"
                width={200}
                height={200}
              />
              <div className="absolute hidden group-hover:block top-1/3 left-1/3  text-lg font-black">
                Phase 3 <span className="text-purple-600">HERMES</span>
              </div>
            </Link>
          </CarouselItem>
          <CarouselItem className="group relative basis-1/4 md:basis-1/3 lg:basis-1/5 xl:basis-[14.2857143%]">
            <Link href="/">
              <Image
                className="rounded-lg group-hover:opacity-20"
                src={apollo.src}
                alt="hades img"
                width={200}
                height={200}
              />
              <div className="absolute hidden group-hover:block top-1/3 left-1/3  text-lg font-black">
                Phase 4 <span className="text-purple-600">APOLLO</span>
              </div>
            </Link>
          </CarouselItem>
          <CarouselItem className="group relative basis-1/4 md:basis-1/3 lg:basis-1/5 xl:basis-[14.2857143%]">
            <Link href="/">
              <Image
                className="rounded-lg group-hover:opacity-20"
                src={prometeu.src}
                alt="hades img"
                width={200}
                height={200}
              />
              <div className="absolute hidden group-hover:block top-1/3 left-1/3  text-lg font-black">
                Phase 5 <span className="text-purple-600">PROMETEU</span>
              </div>
            </Link>
          </CarouselItem>
          <CarouselItem className="group relative basis-1/4 md:basis-1/3 lg:basis-1/5 xl:basis-[14.2857143%]">
            <Link href="/">
              <Image
                className="rounded-lg group-hover:opacity-20"
                src={zeus.src}
                alt="hades img"
                width={200}
                height={200}
              />
              <div className="absolute hidden group-hover:block top-1/3 left-1/3  text-lg font-black">
                Phase 6 <span className="text-purple-600">ZEUS</span>
              </div>
            </Link>
          </CarouselItem>
          <CarouselItem className="group relative basis-1/4 md:basis-1/3 lg:basis-1/5 xl:basis-[14.2857143%]">
            <Link href="/">
              <Image
                className="rounded-lg group-hover:opacity-20"
                src={hades.src}
                alt="hades img"
                width={200}
                height={200}
              />
              <div className="absolute hidden group-hover:block top-1/3 left-1/3  text-lg font-black">
                Phase 7 <span className="text-purple-600">HADES</span>
              </div>
            </Link>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="xl:hidden" />
        <CarouselNext className="xl:hidden" />
      </Carousel>
    </div>
  )
}

export default MentorshipList
