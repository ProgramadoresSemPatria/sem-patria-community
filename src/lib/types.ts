export type RouteProps = {
  href: string
  label: string
  active?: boolean
  disabled?: boolean
  icon?: React.ReactNode
}
export type MetorshipPhasesProps = {
  href: string
  src: string
  phase: string
  title: string
}

export enum Roles {
  PerfilFechado = 'Perfil Fechado',
  PortifolioBoostProgram = 'Portifólio Boost Program',
  Base = 'Base',
  ProgramadorSemPatria = 'Programador Sem Pátria',
  Prime = 'Prime',
  Builder = 'Builder',
  Admin = 'Admin'
}
