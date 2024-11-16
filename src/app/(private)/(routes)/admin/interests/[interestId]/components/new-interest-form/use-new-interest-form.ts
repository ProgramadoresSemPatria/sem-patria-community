import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Interest } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  interest: z.string().min(1, {
    message: 'Name is required'
  })
})

type NewInterestFormValues = z.infer<typeof formSchema>

type UseNewInterestFormProps = {
  initialData: Interest | null
}

export const useNewInterestForm = ({
  initialData
}: UseNewInterestFormProps) => {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const title = initialData ? 'Edit interest' : 'Create interest'
  const toastMessage = initialData
    ? 'Interest updated.'
    : 'Interest created successfully'
  const action = initialData ? 'Save changes' : 'Create interest'

  const form = useForm<NewInterestFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interest: initialData?.interest ?? ''
    }
  })

  const { mutateAsync: deleteInterest, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      return await api.delete(`/api/interest/${params.interestId}`)
    },
    onSuccess: () => {
      router.push(appRoutes.admin_interests)
      router.refresh()
      toast({
        title: 'Success',
        description: 'Interest deleted successfully.'
      })
    },
    onError: err => {
      console.error('Error deleting interest', err)
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    }
  })

  const { mutateAsync: createOrUpdateInterest, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      if (initialData) {
        return await api.patch(`/api/interest/${params.interestId}`, data)
      }

      return await api.post(`/api/interest`, data)
    },
    onSuccess: () => {
      router.push(appRoutes.admin_interests)
      router.refresh()
      toast({
        title: 'Success',
        description: `${toastMessage}`
      })
    },
    onError: err => {
      console.error('Error creating/updating user', err)
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    }
  })

  const onSubmit = async (values: NewInterestFormValues) => {
    await createOrUpdateInterest(values)
  }

  const onDeleteInterest = async () => {
    try {
      await deleteInterest()
    } catch (error) {
      console.log('Error deleting interest', error)
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    } finally {
      setIsAlertModalOpen(false)
    }
  }

  return {
    isAlertModalOpen,
    isDeleting,
    setIsAlertModalOpen,
    onDeleteInterest,
    title,
    isPending,
    form,
    onSubmit,
    action
  }
}
