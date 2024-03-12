import { useCallback, useState } from 'react'

export enum TabTypes {
  VIDEOS = 'videos',
  PROGRAMS = 'programs',
  ASSETS = 'assets'
}

export const useMentorshipTab = () => {
  const [tab, setTab] = useState<TabTypes>(TabTypes.VIDEOS)

  const handleSetTab = useCallback((tab: TabTypes) => {
    setTab(tab)
  }, [])

  const videos = [
    {
      title: 'Mindset e disciplina',
      href: '/',
      description: ''
    },
    {
      title: 'Gestão de tempo',
      href: '/',
      description: ''
    },
    {
      title: 'Alinhamento de mentalidade',
      href: '/',
      description: ''
    },
    {
      title: 'Como realmente aprender tudo que estuda',
      href: '/',
      description: ''
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

  return { tab, handleSetTab, videos, assets }
}
