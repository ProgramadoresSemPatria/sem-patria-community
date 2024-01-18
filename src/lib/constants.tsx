import { type CarouselItemsMentorshipListProps } from './types'

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
  admin_categories_new = '/admin/categories/new'
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

export const CarouselItemsMentorshipList: CarouselItemsMentorshipListProps[] = [
  {
    href: '/',
    src: '/assets/genesis.PNG',
    phase: 'Phase 1 ',
    title: 'GENESIS'
  },
  {
    href: '/',
    src: '/assets/hefesto.PNG',
    phase: 'Phase 2 ',
    title: 'HEFESTO'
  },
  {
    href: '/',
    src: '/assets/hermes.PNG',
    phase: 'Phase 3 ',
    title: 'HERMES'
  },
  {
    href: '/',
    src: '/assets/apollo.PNG',
    phase: 'Phase 4 ',
    title: 'APOLLO'
  },
  {
    href: '/',
    src: '/assets/prometeu.PNG',
    phase: 'Phase 5 ',
    title: 'PROMETEU'
  },
  {
    href: '/',
    src: '/assets/zeus.PNG',
    phase: 'Phase 6 ',
    title: 'ZEUS'
  },
  {
    href: '/',
    src: '/assets/hades.PNG',
    phase: 'Phase 7 ',
    title: 'HADES'
  }
]
