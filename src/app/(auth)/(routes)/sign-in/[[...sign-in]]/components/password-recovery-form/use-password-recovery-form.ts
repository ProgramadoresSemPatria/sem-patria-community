import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { type Dispatch, type SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const passwordRecoverySchema = z.object({
  email: z.string().email()
})

interface UsePasswordRecoveryFormProps {
  setActiveStep: Dispatch<SetStateAction<number>>
}

export const usePasswordRecoveryForm = ({
  setActiveStep
}: UsePasswordRecoveryFormProps) => {
  const form = useForm({
    resolver: zodResolver(passwordRecoverySchema),
    mode: 'onChange',
    defaultValues: {
      email: ''
    }
  })

  const { mutateAsync, isPending, isSuccess, status, reset } = useMutation({
    mutationKey: ['password-recovery'],
    mutationFn: async ({ email }: { email: string }) => {
      const response = await api.post('/api/password-recovery', { email })
      return response
    },
    onSuccess: async () => {
      toast({
        title: 'Your password recovery email has been sent!',
        description: 'Check your inbox for further instructions'
      })
      setTimeout(() => {
        reset()
        setActiveStep(0)
      }, 2000)
    },
    onError: async error => {
      console.log(JSON.stringify(error, null, 2))
      toast({
        title: 'An error ocurred while sending the recovery email',
        description: 'Try again later',
        variant: 'destructive'
      })
      setTimeout(() => {
        reset()
      }, 3000)
    }
  })

  async function onSubmit(values: z.infer<typeof passwordRecoverySchema>) {
    await mutateAsync(values)
    form.reset()
  }
  return {
    form,
    onSubmit,
    isPending,
    isSuccess,
    status
  }
}
