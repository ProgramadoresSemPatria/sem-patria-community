import Apollo from '@/assets/apollo.png'
import Genesis from '@/assets/genesis.png'
import Hades from '@/assets/hades.png'
import Hefesto from '@/assets/hefesto.png'
import Hermes from '@/assets/hermes.png'
import Prometeu from '@/assets/prometeu.png'
import Zeus from '@/assets/zeus.png'
import { Icons } from '@/components/icons'
import { type MenuItemProps, type MetorshipPhasesProps } from './types'

export const appConfig = {
  name: 'Sem pátria - Community',
  description: 'Comunidade programadores sem pátria'
}

export enum appRoutes {
  signIn = '/sign-in',
  root = '/',
  dashboard = '/dashboard',
  courses = '/courses',
  codeUp = '/code-up',
  mentorship = '/mentorship',
  settings = '/settings',
  appearance = '/settings/appearance',
  admin_courses = '/admin/courses',
  admin_courses_new = '/admin/courses/new',
  admin_categories = '/admin/categories',
  admin_categories_new = '/admin/categories/new',
  admin_events = '/admin/events',
  admin_events_new = '/admin/events/new'
}

export const menuItems: MenuItemProps[] = [
  {
    href: appRoutes.dashboard,
    label: 'Dashboard',
    icon: <Icons.dashboard className="h-4 w-4" />
  },
  {
    href: appRoutes.mentorship,
    label: 'Mentorship',
    icon: <Icons.mentorship className="h-4 w-4" />
  },
  {
    href: `${appRoutes.courses}?category=all`,
    label: 'Courses',
    icon: <Icons.code className="h-4 w-4" />
  },
  {
    href: `${appRoutes.codeUp}`,
    label: 'Code Up',
    icon: <Icons.calendar className="h-4 w-4" />
  },
  {
    href: appRoutes.settings,
    label: 'Settings',
    icon: <Icons.settings className="h-4 w-4" />
  },
  {
    href: appRoutes.admin_courses,
    label: 'Courses',
    icon: <Icons.alignVertSA className="h-4 w-4" />
  },
  {
    href: appRoutes.admin_categories,
    label: 'Categories',
    icon: <Icons.layers className="h-4 w-4" />
  },
  {
    href: appRoutes.admin_events,
    label: 'Events',
    icon: <Icons.calendarDays className="h-4 w-4" />
  }
]

export const settingOptions = [
  {
    title: 'User',
    href: appRoutes.settings
  },
  {
    title: 'Appearance',
    href: appRoutes.appearance
  }
]

export const mentorshipPahses: MetorshipPhasesProps[] = [
  {
    href: '/mentorship/phase-1',
    src: Genesis.src,
    phase: 'Phase 1 - GENESIS ',
    title: 'Mentalidade e Disciplina'
  },
  {
    href: '/mentorship/phase-2',
    src: Hefesto.src,
    phase: 'Phase 2 - HEFESTO',
    title: 'Desenvolvimento como dev'
  },
  {
    href: '/mentorship/phase-3',
    src: Hermes.src,
    phase: 'Phase 3 - HERMES',
    title: 'Aprenda a se vender'
  },
  {
    href: '/mentorship/phase-4',
    src: Apollo.src,
    phase: 'Phase 4 - APOLLO',
    title: 'Networking e relações profissionais '
  },
  {
    href: '/mentorship/phase-5',
    src: Prometeu.src,
    phase: 'Phase 5 - PROMETEU',
    title: 'Prospectar vagas e jobs'
  },
  {
    href: '/mentorship/phase-6',
    src: Zeus.src,
    phase: 'Phase 6 - ZEUS',
    title: 'Superando o mercado'
  },
  {
    href: '/mentorship/phase-7',
    src: Hades.src,
    phase: 'Phase 7 - HADES',
    title: 'Consegui um sim e agora?'
  }
]

export const mentorshipPrograms = () => {
  const programs = [
    {
      vimeoProjectId: '19781607',
      title: 'A Base',
      chapters: 10,
      progress: 0,
      thumbnail: Genesis.src
    },
    {
      vimeoProjectId: '19781609',
      title: 'Programador Sem Pátria',
      chapters: 10,
      progress: 0,
      thumbnail: Hades.src
    }
  ]

  return programs
}
