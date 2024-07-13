import BeginnerImg from '@/assets/beginner.jpg'
import IntermediateImg from '@/assets/intermediate.jpg'
import AdvancedImg from '@/assets/advanced.jpg'
import BgCardImg from '@/assets/card-bg.png'
import {
  IconCourseAdvancedLevel,
  IconCourseBeginnerLevel,
  IconCourseIntermediateLevel
} from '@/components/icons/custom-svgs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
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
    return levelImage[level]
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
      <div className="flex flex-col w-full justify-start rounded-[10px] dark:hover:bg-slate-900 hover:bg-slate-200 overflow-hidden transition cursor-pointer text-left dark:bg-slate-950 bg-slate-100 border dark:border-slate-800 border-slate-200">
        <Image alt="bg-card" src={BgCardImg} className="absolute" />
        <div className="flex flex-col flex-1 w-full gap-4 p-6">
          <div className="w-full flex items-center justify-between h-11 mb-1">
            <div className="relative w-18 h-16">
              <Image
                src={renderLevelImage(props.level)}
                alt={props.name}
                className="w-full h-full rounded-md object-cover"
              />
            </div>
            <div className="flex gap-2 items-center self-start shrink-0">
              <span
                className={cn(
                  props.isPaid
                    ? 'text-violet-900 border-violet-800'
                    : 'text-[#29e0a9] border-[#29e0a9]',
                  'inline-flex justify-center items-center gap-1 flex-shrink-0 w-fit rounded font-bold uppercase box-border  h-6 px-2 text-[10px] leading-4 bg-transparent border border-solid'
                )}
              >
                {props.isPaid ? 'PAID' : 'FREE'}
              </span>
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
