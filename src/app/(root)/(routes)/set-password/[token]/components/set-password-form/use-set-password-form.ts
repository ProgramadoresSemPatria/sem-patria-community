import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string()
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords did not match'
      })
    }
  })

type NewPasswordFormValues = z.infer<typeof formSchema>

type UseSetPasswordFormProps = {
  params: {
    token: string
  }
}

export const useSetPasswordForm = ({ params }: UseSetPasswordFormProps) => {
  const router = useRouter()

  const form = useForm<NewPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  const { error, isSuccess, isLoading } = useQuery({
    queryKey: ['set-password'],
    queryFn: async () => await api.get(`/api/auth/${params.token}`)
  })

  const { mutateAsync: setPassword, isPending: isUpdatingPassword } =
    useMutation({
      mutationFn: async (data: z.infer<typeof formSchema>) => {
        if (data.password === data.confirmPassword) {
          return await api.patch(`/api/auth/${params.token}`, {
            password: data.password
          })
        }
      },
      onSuccess: () => {
        router.push(appRoutes.signIn)
        router.refresh()
        toast({
          title: 'Success',
          description: 'Password changed successfully.'
        })
      },
      onError: (error: AxiosError) => {
        toast({
          title: 'Error',
          description: error.response?.data
            ? `${error.response.data as string}`
            : 'Something went wrong.',
          variant: 'destructive'
        })
      }
    })

  const onSubmit = async (values: NewPasswordFormValues) => {
    await setPassword({ ...values })
  }

  useEffect(() => {
    if (error) {
      router.push(appRoutes.signIn)
    }
  }, [error, isSuccess, isLoading, router])
  return {
    form,
    onSubmit,
    isLoading,
    isUpdatingPassword,
    showPassword,
    toggleShowPassword
  }
}
