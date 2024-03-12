export const useProgramPage = () => {
  const formatTitle = (title: string) => {
    const titleHref: Record<string, string> = {
      'a-base': 'A Base',
      psp: 'Programador Sem Pátria',
      prime: 'Programador Prime',
      'perfil-fechado': 'Perfil Fechado'
    }

    return titleHref[title]
  }

  return { formatTitle }
}
