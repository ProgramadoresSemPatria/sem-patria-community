'use client'
import React, { useState } from 'react'
import MainLogo from '@/components/main-logo'
import Link from 'next/link'
import { Icons } from '@/components/icons'
import { mentorshipPahses } from '@/lib/constants'
import { cn } from '@/lib/utils'

const videos = ['Video 1', 'Video 20', 'Video3', 'video 4']
type TabType = 'videos' | 'phases'

const PhasePage = ({ params }: { params: { phase: string } }) => {
  const [tab, setTab] = useState<TabType>('videos')
  const actualPhase = mentorshipPahses.filter(item => {
    return item.href.includes(params.phase)
  })
  console.log(actualPhase)

  return (
    <div className="flex gap-x-2">
      <div className="flex flex-col gap-y-2">
        <MainLogo />
        <iframe
          width={1200}
          height={560}
          src="https://www.youtube.com/watch?v=ADJKbuayubE"
        />
        <h1 className="p-4 font-bold text-2xl">Como montar seu curriculo</h1>
      </div>
      {/* Phase videos */}
      <div className=" rounded-xl w-full mt-12">
        <div className="flex py-4 ">
          <div
            className={cn(
              'hover:cursor-pointer border-b-2 pb-3 w-1/2 flex justify-center',
              tab === 'videos' ? 'border-purple-600' : 'border-gray-600'
            )}
            onClick={() => {
              setTab('videos')
            }}
          >
            <Icons.videos />
          </div>
          <div
            className={cn(
              'hover:cursor-pointer border-b-2 pb-3 w-1/2 flex justify-center',
              tab === 'phases' ? 'border-purple-600' : 'border-gray-600'
            )}
            onClick={() => {
              setTab('phases')
            }}
          >
            <Icons.mentorship />
          </div>
        </div>
        <Link href={`/`}>
          <h1 className="font-bold text-2xl py-2">
            {actualPhase[0].phase} - {actualPhase[0].title}{' '}
          </h1>
        </Link>
        {tab === 'videos' && (
          <div className="border border-slate-300 flex flex-col p-6 mr-2  gap-y-2 rounded-md">
            <h1>Videos</h1>
            {videos.map(video => (
              <h2 key={video} className="text-xl">
                {video}
              </h2>
            ))}
          </div>
        )}
        {tab === 'phases' && (
          <div className="border border-slate-300 flex flex-col mr-2 p-6  gap-y-2 rounded-md">
            <h1>Phases</h1>
            {mentorshipPahses.map(phase => (
              <h2 key={phase.title} className="text-xl">
                {phase.title}
              </h2>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PhasePage
