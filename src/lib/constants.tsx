import Apollo from '@/assets/apollo.png'
import Genesis from '@/assets/genesis.png'
import Hades from '@/assets/hades.png'
import Hefesto from '@/assets/hefesto.png'
import Hermes from '@/assets/hermes.png'
import Prometeu from '@/assets/prometeu.png'
import Zeus from '@/assets/zeus.png'
import { type MetorshipPhasesProps } from './types'

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
    phase: 'Phase 1 ',
    title: 'GENESIS'
  },
  {
    href: '/mentorship/phase-2',
    src: Hefesto.src,
    phase: 'Phase 2 ',
    title: 'HEFESTO'
  },
  {
    href: '/mentorship/phase-3',
    src: Hermes.src,
    phase: 'Phase 3 ',
    title: 'HERMES'
  },
  {
    href: '/mentorship/phase-4',
    src: Apollo.src,
    phase: 'Phase 4 ',
    title: 'APOLLO'
  },
  {
    href: '/mentorship/phase-5',
    src: Prometeu.src,
    phase: 'Phase 5 ',
    title: 'PROMETEU'
  },
  {
    href: '/mentorship/phase-6',
    src: Zeus.src,
    phase: 'Phase 6 ',
    title: 'ZEUS'
  },
  {
    href: '/mentorship/phase-7',
    src: Hades.src,
    phase: 'Phase 7 ',
    title: 'HADES'
  }
]
