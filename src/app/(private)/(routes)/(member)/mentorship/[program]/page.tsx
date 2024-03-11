'use client'
import Zeus from '@/assets/zeus.png'
import { Icons } from '@/components/icons'
import { mentorshipPahses } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { MentorshipHeader } from './components/mentorship-header'

const videos = [
  {
    title: 'Mindset e disciplina',
    href: '/',
    description: '',
    imageSrc: Zeus.src
  },
  {
    title: 'Gestão de tempo',
    href: '/',
    description: '',
    imageSrc: Zeus.src
  },
  {
    title: 'Alinhamento de mentalidade',
    href: '/',
    description: '',
    imageSrc: Zeus.src
  },
  {
    title: 'Como realmente aprender tudo que estuda',
    href: '/',
    description: '',
    imageSrc: Zeus.src
  }
]

const assets = [
  {
    title: 'Resume example'
  },
  {
    title: 'Link to Something'
  },
  {
    title: 'PDF Dowload'
  }
]

type TabType = 'videos' | 'phases' | 'assets'

const ProgramPage = ({ params }: { params: { program: string } }) => {
  const [tab, setTab] = useState<TabType>('videos')
  const [showTab, setShowTab] = useState(true)

  return (
    <>
      <MentorshipHeader title={params.program} />
      <div className="overflow-auto h-[calc(100vh-72px)]">
        <div className="flex flex-col md:flex-row h-full box-border overflow-x-auto md:overflow-hidden">
          <div className="flex flex-col flex-1 flex-shrink-0 w-full md:overflow-y-auto transition-[height]">
            <iframe
              className="w-full md:h-[calc(80vh-80px)] rounded-md"
              src="https://www.youtube.com/watch?v=ADJKbuayubE"
            />
            <span>{`Inicio > `}</span>
            <h1 className="p-4 font-bold text-2xl">
              Como montar seu curriculo
            </h1>
          </div>
          {/* Phase videos */}
          <div className="flex flex-col self-stretch w-full md:w-[360px] min-[1441px]:w-[384px] min-[1921px]:w-[432px] h-full border-l border-l-gray-800 transition-all">
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
                <Icons.play />
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
              <div
                className={cn(
                  'hover:cursor-pointer border-b-2 pb-3 w-1/2 flex justify-center',
                  tab === 'assets' ? 'border-purple-600' : 'border-gray-600'
                )}
                onClick={() => {
                  setTab('assets')
                }}
              >
                <Icons.file />
              </div>
            </div>
            <div
              onClick={() => {
                setShowTab(!showTab)
              }}
              className="flex items-center justify-between cursor-pointer"
            >
              <h1 className="font-bold text-2xl py-2 ml-3 ">
                actualPhase.phase, actualPhase.title{' '}
              </h1>
              <span>{showTab ? <Icons.arrowUp /> : <Icons.arrowDown />}</span>
            </div>
            {tab === 'videos' && showTab && (
              <div className="max-w-full border border-slate-300 flex flex-col p-4 mx-2 lg:mr-2 gap-y-2 rounded-md">
                <h1 className="text-xl font-bold -mt-3 mb-3 ">Videos</h1>
                {videos.map(video => (
                  <Link
                    className="flex items-center"
                    key={video.title}
                    href={`${video.href}`}
                  >
                    <div className="w-[100px] h-[80px] overflow-hidden flex-shrink-0">
                      <Image
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                        alt="video"
                        src={video.imageSrc}
                      />
                    </div>
                    <div className="flex flex-col ml-2">
                      <h2 key={video.href} className="text-lg line-clamp-3">
                        {video.title}
                      </h2>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {tab === 'phases' && showTab && (
              <div className="max-w-full border border-slate-300 flex flex-col p-4 mx-2 gap-y-2 rounded-md">
                <h1 className="text-xl font-bold -mt-3 mb-3 "> Phases</h1>
                {mentorshipPahses.map((phase, index) => (
                  <Link key={phase.title} href={`${phase.href}`}>
                    <h2 key={phase.title} className="text-xl">
                      {index + 1} - {phase.title}
                    </h2>
                  </Link>
                ))}
              </div>
            )}
            {tab === 'assets' && showTab && (
              <div className="max-w-full border border-slate-300 flex flex-col p-4 mx-2 gap-y-2 rounded-md">
                <h1 className="text-xl font-bold -mt-3 mb-3 ">Assets</h1>
                {assets.map((asset, index) => (
                  <Link key={asset.title} href={`${asset.title}`}>
                    <h2 key={asset.title} className="text-xl">
                      {index + 1} - {asset.title}
                    </h2>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProgramPage
