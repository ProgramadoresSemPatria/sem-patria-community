'use client'
import * as React from 'react'

const MOBILE_BREAKPOINT = 768
const MOBILE_BREAKPOINT_TOP_BAR = 950

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const [isTopBarMobile, setIsTopBarMobile] = React.useState<
    boolean | undefined
  >(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => {
      mql.removeEventListener('change', onChange)
    }
  }, [])

  React.useEffect(() => {
    const mql = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT_TOP_BAR - 1}px)`
    )
    const onChange = () => {
      setIsTopBarMobile(window.innerWidth < MOBILE_BREAKPOINT_TOP_BAR)
    }
    mql.addEventListener('change', onChange)
    setIsTopBarMobile(window.innerWidth < MOBILE_BREAKPOINT_TOP_BAR)
    return () => {
      mql.removeEventListener('change', onChange)
    }
  }, [])

  return { isMobile: !!isMobile, setIsMobile, isTopBarMobile }
}
