import AdvancedImg from '@/assets/advanced.jpg'
import BeginnerImg from '@/assets/beginner.jpg'
import BgCardImg from '@/assets/card-bg.png'
import IntermediateImg from '@/assets/intermediate.jpg'
import {
  IconCourseAdvancedLevel,
  IconCourseBeginnerLevel,
  IconCourseIntermediateLevel
} from '@/components/icons/custom-svgs'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { type Course } from '@prisma/client'
import Image, { type StaticImageData } from 'next/image'
import { useMemo } from 'react'

type CourseCardProps = {
  courseProps: Course
}

export const CourseCard = ({ courseProps: props }: CourseCardProps) => {
  const renderLevelImage = (level: string) => {
    const levelImage: Record<string, StaticImageData> = {
      beginner: BeginnerImg,
      intermediate: IntermediateImg,
      advanced: AdvancedImg
    }
    return levelImage[level] || BeginnerImg
  }

  const loadCourseIconLevel = useMemo(() => {
    const iconLevel: Record<string, JSX.Element> = {
      beginner: <IconCourseBeginnerLevel />,
      intermediate: <IconCourseIntermediateLevel />,
      advanced: <IconCourseAdvancedLevel />
    }

    return iconLevel[props.level]
  }, [props.level])

  return (
    <div className="relative flex w-full">
      <div className="flex flex-col w-full justify-start rounded-[10px] overflow-hidden transition cursor-pointer text-left border bg-card hover:bg-card/20">
        <Image alt="bg-course-card" src={BgCardImg} className="absolute" />
        <div className="flex flex-col flex-1 w-full gap-4 p-6">
          <div className="w-full flex items-center justify-between h-11 mb-1">
            <div className="relative">
              <Image
                src={renderLevelImage(props.level)}
                alt={props.name}
                className="w-full h-full rounded-md object-cover"
                width={72}
                height={64}
              />
            </div>
            <div className="flex gap-2 items-center self-start shrink-0">
              <Badge variant={props.isPaid ? 'default' : 'secondary'}>
                {props.isPaid ? 'PAID' : 'FREE'}
              </Badge>
            </div>
          </div>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="mt-1 text-base font-medium dark:text-gray-100 text-black leading-snug line-clamp-2 h-[3rem]">
                    {props.name}
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-[400px]">
                  {props.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="w-fit inline-flex items-center gap-2 border border-gray-600 text-[10px] font-medium whitespace-nowrap px-3 py-1 dark:text-gray-200 text-black tracking-wide uppercase rounded-full hover:border-gray-500 cursor-pointer transition">
            {loadCourseIconLevel}
            <span>{props.level}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
