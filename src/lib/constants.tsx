import Genesis from '@/assets/genesis.png'
import Hades from '@/assets/hades.png'
import Hefesto from '@/assets/hefesto.png'
import Hermes from '@/assets/hermes.png'
import { Icons } from '@/components/icons'
import { type User } from '@prisma/client'
import {
  type MentorshipPhasesProps,
  type MentorshipProgramModuleProps,
  type MenuItemProps
} from './types'

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
  profile = '/profile',
  interests = '/interests',
  forum = '/forum',
  appearance = '/profile/appearance',
  publicProfile = '/user',
  checklist = '/profile/checklist',
  admin_courses = '/admin/courses',
  admin_courses_new = '/admin/courses/new',
  admin_categories = '/admin/categories',
  admin_interests = '/admin/interests',
  admin_interests_new = '/admin/interests/new',
  admin_categories_new = '/admin/categories/new',
  admin_events = '/admin/events',
  admin_events_new = '/admin/events/new',
  admin_classroom = '/admin/classroom',
  admin_classroom_new = '/admin/classroom/new',
  admin_classroom_module_new = '/admin/classroom/module/new',
  admin_users = '/admin/users',
  admin_users_new = '/admin/users/new',
  admin_classroom_video_new = '/admin/classroom/video/new'
}

export const menuItems: MenuItemProps[] = [
  {
    href: appRoutes.dashboard,
    label: 'Dashboard',
    icon: <Icons.dashboard className="h-4 w-4" />
  },
  {
    href: `${appRoutes.forum}?category=All`,
    label: 'Forum',
    icon: <Icons.forum className="h-4 w-4" />
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
    href: appRoutes.profile,
    label: 'Profile',
    icon: <Icons.circleUser className="h-4 w-4" />
  },
  {
    href: appRoutes.interests,
    label: 'Interests',
    icon: <Icons.list className="h-4 w-4" />
  },
  {
    href: appRoutes.admin_users,
    label: 'Users',
    icon: <Icons.users className="h-4 w-4" />
  },
  {
    href: appRoutes.admin_courses,
    label: 'Courses',
    icon: <Icons.codeSandbox className="h-4 w-4" />
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
  },
  {
    href: `${appRoutes.admin_classroom}?tabSelected=classroom`,
    label: 'Classroom',
    icon: <Icons.classroom className="h-4 w-4" />
  },
  {
    href: appRoutes.admin_interests,
    label: 'Interests',
    icon: <Icons.list className="h-4 w-4" />
  }
]
export const getPublicProfileRoute = (username: string): string => {
  return `${appRoutes.publicProfile}/${encodeURIComponent(username)}`
}

export function getSettingOptions(routes: typeof appRoutes, user: User) {
  return [
    {
      title: 'User',
      href: routes.profile
    },
    {
      title: 'Appearance',
      href: routes.appearance
    },
    {
      title: 'Checklist',
      href: routes.checklist
    },
    {
      title: 'Public profile',
      href: `${routes.publicProfile}/${user?.username || 'unknown'}`
    }
  ]
}

export const mentorshipPhases: MentorshipPhasesProps[] = [
  {
    href: '/mentorship/perfil-fechado',
    src: Hades.src,
    title: 'Perfil Fechado'
  },
  {
    href: '/mentorship/a-base',
    src: Genesis.src,
    title: 'A Base do Programador Sem Pátria'
  },
  {
    href: '/mentorship/psp',
    src: Hefesto.src,
    title: 'Programador Sem Pátria'
  },
  {
    href: '/mentorship/prime',
    src: Hermes.src,
    title: 'Programador Prime'
  }
]

export const mentorshipProgramModuleProps = (program: string) => {
  const props: Record<string, MentorshipProgramModuleProps> = {
    Fundamentos: {
      image: Genesis.src
    },
    Roadmap: {
      image: Hades.src
    },
    Preparação: {
      image: Hefesto.src
    }
  }

  return props[program]
}

export const emailTemplate = (user: User, url: string) => `
<main>
<h1>Fala, ${user.name}!</h1>
<span>Aqui é o Yuri Pereira, fundador da Borderless Coding. Passando para avisar que seu acesso foi liberado!</span>
<br />
<p>Agora você tem acesso a área de membros da Borderless Coding, o conteúdo que você adquiriu já está disponível, abaixo está o link para você gerar a sua senha de acesso a plataforma:
</p>
<a href="${url}">${url}</a>
<p>Assim que entrar na plataforma, aproveite para subir sua foto e preencher com suas informações pessoais.</p>
<p>Dentro teremos um video introdutório explicando como utilizar nossa área de membros na qual teremos todos os conteúdos necessários para sua evolução, fórum, desafio code UP e muito mais!
</p>
<p>Vale lembrar que o primeiro passo para sua evolução é a saída da zona de conforto para sua carreira global, logo a plataforma por default está em inglês.
</p>
<a href="${process.env.BASE_URL_PRODUCTION}">${process.env.BASE_URL_PRODUCTION}</a>
<br />
<p>
Um grande abraço e vamos pra cima!
<br />
Go Global or Nothing.
</p>
<p>Yuri Pereira</p>
</main>
`

export const passwordRecoveryEmailTemplate = (user: User, url: string) => `
<main>
<h1>Fala, ${user.name}!</h1>
<span>Você solicitou a recuperação de sua senha.</span>
<br />
<p>Aqui está o link para você gerar uma nova senha de acesso a plataforma:
</p>
<a href="${url}">${url}</a>
<p>
  Se você não solicitou a recuperação de senha, por favor, ignore este e-mail.
</p>
<br />
<p>
  Equipe Borderless Coding Community
</p>
</main>
`

export const prePspPermissions: Record<string, string[]> = {
  'Mentoria - A Base': [
    '10d9700e-8869-4017-a195-fbd9dd1125f4',
    '26d133a9-a1a6-4367-8d2b-ca391bc8445e',
    'dea88009-1dc8-46fe-86f8-f81e6954b67c',
    'df759f6d-7971-4d53-893d-516ce07ca5ff',
    'f326632b-7a8a-40fb-b60a-8ce9edda8d5a'
  ],
  'Portfólio Boost Program': ['6fea989d-ac41-48d2-a916-e5a37464b506'],
  'Acompanhamento - Programador Sem Pátria': [
    'ec5260a3-325d-437e-b5cb-02ac88b52959',
    '5ced2e37-7c35-4cf5-a889-43a1a4ef65ce'
  ],
  'Mentoria - Programador Sem Pátria': [
    'bd4321b5-e9c2-409c-be19-64d584df00a6',
    '0d01f622-417b-4f31-914f-28ce1bbb1bd9',
    'fd528cb7-7c93-4cfe-9979-f43e90d6cbf7'
  ]
}
export const badgeStyles = [
  'inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20 hover:bg-gray-400/20',
  'inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20 hover:bg-red-400/20',
  'inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20 hover:bg-yellow-400/20',
  'inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20 hover:bg-green-500/20',
  'inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/30 hover:bg-blue-400/20',
  'inline-flex items-center rounded-md bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30 hover:bg-indigo-400/20',
  'inline-flex items-center rounded-md bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-400 ring-1 ring-inset ring-purple-400/30 hover:bg-purple-400/20',
  'inline-flex items-center rounded-md bg-pink-400/10 px-2 py-1 text-xs font-medium text-pink-400 ring-1 ring-inset ring-pink-400/20 hover:bg-pink-400/20'
]

export function getRandomStyle() {
  let remainingStyles = [...badgeStyles]
  if (remainingStyles.length === 0) {
    remainingStyles = [...badgeStyles]
  }
  const randomIndex = Math.floor(Math.random() * remainingStyles.length)
  const selectedStyle = remainingStyles[randomIndex]
  remainingStyles.splice(randomIndex, 1)
  return selectedStyle
}

export const SCORE_PONTUATION = {
  FORUM_POST_LIKE: 1,
  FORUM_POST_COMMENT_LIKE: 1,
  COURSE_RECOMMENDATION: 1
}
