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
  settings = '/settings',
  forum = '/forum',
  appearance = '/settings/appearance',
  checklist = '/settings/checklist',
  admin_courses = '/admin/courses',
  admin_courses_new = '/admin/courses/new',
  admin_categories = '/admin/categories',
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
    href: appRoutes.settings,
    label: 'Settings',
    icon: <Icons.settings className="h-4 w-4" />
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
  },
  {
    title: 'Checklist',
    href: appRoutes.checklist
  }
]

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
