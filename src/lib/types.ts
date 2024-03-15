export type MenuItemProps = {
  href: string
  label: string
  active?: boolean
  disabled?: boolean
  icon?: React.ReactNode
}
export type MentorshipPhasesProps = {
  href: string
  src: string
  title: string
}

export enum Roles {
  Base,
  PSP,
  Prime,
  PerfilFechado,
  Admin
}
