'use client'
import { type CarouselApi } from '@/components/ui/carousel'
import { useCallback, useEffect, useState } from 'react'

export const useModuleCarousel = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleClickForward = useCallback(() => {
    if (!canScrollNext) return
    carouselApi?.scrollNext()
  }, [canScrollNext, carouselApi])

  const handleClickBackward = useCallback(() => {
    if (!canScrollPrev) return
    carouselApi?.scrollPrev()
  }, [canScrollPrev, carouselApi])

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) {
      return
    }

    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  useEffect(() => {
    if (!carouselApi) {
      return
    }

    onSelect(carouselApi)
    carouselApi.on('reInit', onSelect)
    carouselApi.on('select', onSelect)

    return () => {
      carouselApi?.off('select', onSelect)
    }
  }, [carouselApi, onSelect])

  return {
    isMounted,
    carouselApi,
    setCarouselApi,
    handleClickForward,
    handleClickBackward
  }
}
