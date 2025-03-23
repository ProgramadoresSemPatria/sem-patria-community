'use client'
import { type CarouselApi } from '@/components/ui/carousel'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'

export const useModuleCarousel = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

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

  const { mutateAsync: saveOrder } = useMutation({
    mutationKey: ['update-order'],
    mutationFn: async (
      orderedClassroom: Array<{ id: string; order: number | null }>
    ) => {
      await api.patch(`/api/classroom`, {
        items: orderedClassroom
      })
    },
    onSuccess: async () => {
      toast({
        title: 'The order was updated succesfully'
      })
    },
    onError: err => {
      console.error('Error ordering videos', err)
      toast({
        title: 'An error occurred while ordering videos'
      })
    }
  })
  const handleSaveOrder = async (
    classrooms: Array<{ id: string; order: number | null }>
  ) => {
    try {
      await saveOrder(classrooms)
    } catch (error) {
      console.error('Failed to save order:', error)
    }
  }

  return {
    isMounted,
    carouselApi,
    setCarouselApi,
    handleClickForward,
    handleClickBackward,
    handleSaveOrder,
    isSaving,
    setIsSaving
  }
}
