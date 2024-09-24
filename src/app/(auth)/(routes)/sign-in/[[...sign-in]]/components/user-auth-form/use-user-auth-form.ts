import { toast } from '@/components/ui/use-toast'
import { useSignIn } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

type UseUserAuthFormProps = {
  redirectUrl: string
}

export const useUserAuthForm = ({ redirectUrl }: UseUserAuthFormProps) => {
  const router = useRouter()
  const { isLoaded, signIn, setActive } = useSignIn()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationKey: ['sign-in'],
    mutationFn: async ({
      email,
      password
    }: {
      email: string
      password: string
    }) => {
      if (!isLoaded) {
        return
      }

      // Start the sign-in process using the email and password provided
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
        redirectUrl
      })

      if (completeSignIn.status !== 'complete') {
        // The status can also be `needs_factor_on', 'needs_factor_two', or 'needs_identifier'
        console.log(JSON.stringify(completeSignIn, null, 2))
      }

      if (completeSignIn.status === 'complete') {
        await setActive({ session: completeSignIn.createdSessionId })
      }

      return completeSignIn
    },
    onSuccess: async data => {
      const userData = data?.userData

      toast({
        title: `Welcome ${userData?.firstName}!`,
        description: 'You have successfully signed in'
      })
      router.push(redirectUrl || '/dashboard')
    },
    onError: async error => {
      if (error.message === 'Session already exists') {
        router.push(redirectUrl || '/dashboard')
      }
      console.log('Error authenticating')
      toast({
        title: 'An error ocurred while signing in',
        description: 'Try again later',
        variant: 'destructive'
      })
    }
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await mutateAsync(values)
    form.reset()
  }
  return {
    form,
    onSubmit,
    isPending,
    isSuccess,
    showPassword,
    toggleShowPassword
  }
}
