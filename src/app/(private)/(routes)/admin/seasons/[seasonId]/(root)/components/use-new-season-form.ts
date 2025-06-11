import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { type Season, type PositionMultiplier, Positions } from '@prisma/client'
import { addMonths } from 'date-fns'

// https://github.com/colinhacks/zod/discussions/2178
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])
type Literal = z.infer<typeof literalSchema>
type Json = Literal | { [key: string]: Json } | Json[]
const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
)

const awardSchema = z.object({
  position: z.string().min(1, { message: 'Position is required' }),
  description: z.string().min(1, { message: 'Description is required' })
})

const positionMultiplierSchema = z.array(
  z.object({
    id: z.string().optional(),
    seasonId: z.string().optional(),
    position: z.nativeEnum(Positions),
    multiplier: z
      .number()
      .min(0)
      .max(100, 'Multiplier must be between 0 and 100')
      .default(1.0)
  })
)

const metadataSchema = z
  .object({
    awards: z.array(awardSchema),
    description: z.string()
  })
  .nullable()

const seasonSchema = z.object({
  name: z.string().min(1, {
    message: 'Season name is required'
  }),
  initDate: z.date(),
  endDate: z.date(),
  isCurrent: z.boolean().default(false),
  metadata: metadataSchema,
  positionMultipliers: positionMultiplierSchema
})

type Metadata = z.infer<typeof metadataSchema>
type SeasonFormValues = z.infer<typeof seasonSchema>

type UseNewSeasonFormProps = {
  initialData:
    | (Season & {
        positionMultipliers: PositionMultiplier[]
      })
    | null
}

export const useNewSeasonForm = ({ initialData }: UseNewSeasonFormProps) => {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [isConfirmationPending, setIsConfirmationPending] = useState(false)
  const queryClient = useQueryClient()

  const { data: seasons = [] } = useQuery({
    queryKey: ['seasons'],
    queryFn: async () => {
      const response = await api.get('/api/season')
      return response.data.data
    }
  })

  const form = useForm<SeasonFormValues>({
    resolver: zodResolver(seasonSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          initDate: new Date(initialData.initDate),
          endDate: new Date(initialData.endDate),
          isCurrent: initialData.isCurrent,
          metadata: (initialData.metadata as Metadata) || {
            awards: [],
            description: ''
          },
          positionMultipliers: initialData.positionMultipliers || []
        }
      : {
          name: '',
          initDate: new Date(),
          endDate: addMonths(new Date(), 3),
          isCurrent: seasons.length === 0,
          metadata: { awards: [], description: '' },
          positionMultipliers: Object.values(Positions).map(position => ({
            position,
            multiplier: 1.0
          }))
        }
  })

  useEffect(() => {
    if (initialData) {
      form.setValue('name', initialData.name)
      form.setValue('initDate', new Date(initialData.initDate))
      form.setValue('endDate', new Date(initialData.endDate))
      form.setValue('isCurrent', initialData.isCurrent)
      form.setValue(
        'metadata',
        (initialData.metadata as Metadata) || { awards: [], description: '' }
      )
      form.setValue('positionMultipliers', initialData.positionMultipliers)
    }
  }, [form, initialData])

  const { mutateAsync: createOrUpdateSeason, isPending } = useMutation({
    mutationFn: async (data: SeasonFormValues) => {
      if (initialData) {
        return await api.patch(`/api/season/${params.seasonId}`, data)
      }
      return await api.post(`/api/season`, data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['getCurrentSeason'] })
      router.push(appRoutes.admin_seasons)
      router.refresh()
      toast({
        title: 'Success',
        description: `Season ${
          initialData ? 'updated' : 'created'
        } successfully.`
      })
    },
    onError: err => {
      console.error(
        `Error ${initialData ? 'updating' : 'creating'} season`,
        err
      )
      toast({
        title: 'Error',
        description: `Error ${initialData ? 'updating' : 'creating'} season`,
        variant: 'destructive'
      })
    }
  })

  const { mutateAsync: deleteSeason } = useMutation({
    mutationFn: async () => {
      if (initialData) {
        return await api.delete(
          `/api/season/${params.seasonId || initialData.id}`
        )
      }
    },
    onSuccess: () => {
      router.push(appRoutes.admin_seasons)
      router.refresh()
      toast({
        title: 'Success',
        description: 'Season deleted successfully.'
      })
    },
    onError: err => {
      console.error('Error deleting season', err)
      toast({
        title: 'Error',
        description: 'Failed to delete the season.',
        variant: 'destructive'
      })
    }
  })

  const onSubmit = async (values: SeasonFormValues) => {
    if (values.isCurrent) {
      const currentSeason = seasons.find((season: Season) => season.isCurrent)
      if (
        currentSeason &&
        (!initialData || currentSeason.id !== initialData.id)
      ) {
        setShowConfirmDialog(true)
        return
      }
    }
    await createOrUpdateSeason(values)
  }

  const handleConfirmSubmit = async () => {
    try {
      setIsConfirmationPending(true)
      const values = form.getValues()
      await createOrUpdateSeason(values)
      setShowConfirmDialog(false)
    } finally {
      setIsConfirmationPending(false)
    }
  }

  const title = initialData ? 'Edit season' : 'Create season'
  const action = initialData ? 'Save changes' : 'Create season'

  return {
    form,
    onSubmit,
    isPending,
    isConfirmationPending,
    title,
    action,
    deleteSeason,
    showConfirmDialog,
    setShowConfirmDialog,
    handleConfirmSubmit
  }
}
