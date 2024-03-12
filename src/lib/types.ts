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
  Base,
  PSP,
  Prime,
  PerfilFechado,
  Admin
}
