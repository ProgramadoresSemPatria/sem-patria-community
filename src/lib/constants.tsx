export const appConfig = {
  name: 'Sem pátria - Community',
  description: 'Comunidade programadores sem pátria'
}

export enum appRoutes {
  signIn = '/sign-in',
  dashboard = '/dashboard',
  resources = '/resources',
  settings = '/settings',
  appearance = '/settings/appearance'
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

export const resourcesOptions = [
  {
    title: 'All',
    href: `${appRoutes.resources}?filter=all`,
    param: {
      key: 'filter',
      value: 'all'
    }
  },
  {
    title: 'Frontend',
    href: `${appRoutes.resources}?filter=frontend`,
    param: {
      key: 'filter',
      value: 'frontend'
    }
  },
  {
    title: 'Backend',
    href: `${appRoutes.resources}?filter=backend`,
    param: {
      key: 'filter',
      value: 'backend'
    }
  },
  {
    title: 'Javascript',
    href: `${appRoutes.resources}?filter=javascript`,
    param: {
      key: 'filter',
      value: 'javascript'
    }
  }
]
