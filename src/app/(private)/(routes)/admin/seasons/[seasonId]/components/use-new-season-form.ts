import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { type Season } from '@prisma/client'
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

const metadataSchema = z
  .object({
    awards: z.array(awardSchema),
    description: z.string()
  })
  .nullable()

const seasonSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required'
  }),
  initDate: z.date(),
  endDate: z.date(),
  isCurrent: z.boolean().default(false),
  metadata: metadataSchema
})

type Metadata = z.infer<typeof metadataSchema>
type NewSeasonFormValues = z.infer<typeof seasonSchema>

type UseNewSeasonFormProps = {
  initialData: Season | null
}

export const useNewSeasonForm = ({ initialData }: UseNewSeasonFormProps) => {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<NewSeasonFormValues>({
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
          }
        }
      : {
          name: '',
          initDate: new Date(),
          endDate: addMonths(new Date(), 3),
          isCurrent: false,
          metadata: { awards: [], description: '' }
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
    }
  }, [form, initialData])

  const { mutateAsync: createOrUpdateSeason, isPending } = useMutation({
    mutationFn: async (data: NewSeasonFormValues) => {
      if (initialData) {
        return await api.patch(`/api/season/${params.seasonId}`, data)
      }
      return await api.post(`/api/season`, data)
    },
    onSuccess: () => {
      router.push(appRoutes.admin_seasons)
      router.refresh()
      toast({
        title: 'Success',
        description: initialData
          ? 'Season updated successfully.'
          : 'Season created successfully.'
      })
    },
    onError: err => {
      console.error('Error creating/updating season', err)
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    }
  })

  const onSubmit = async (values: NewSeasonFormValues) => {
    await createOrUpdateSeason(values)
  }

  const title = initialData ? 'Edit season' : 'Create season'
  const action = initialData ? 'Save changes' : 'Create season'

  return {
    form,
    onSubmit,
    isPending,
    title,
    action
  }
}
