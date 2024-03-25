import Header from '@/components/header'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useQuery, useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/lib/constants'
import { toast } from '@/components/ui/use-toast'

const formSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string()
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match'
      })
    }
  })

type NewPasswordFormValues = z.infer<typeof formSchema>

const SetPassword = () => {
  const router = useRouter()
  const title = 'Update password'
  const description = 'Add your new password'
  const toastMessage = 'Password changed successfully'

  const form = useForm<NewPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const verifyToken = async () => {
    await api.get('/api/auth')
  }

  const { error, isSuccess, isPending } = useQuery({
    queryKey: ['set-password'],
    queryFn: verifyToken
  })

  const { mutateAsync: setPassword } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      if (data.password === data.confirmPassword) {
        return await api.patch(`/api/auth`, {
          password: data.password
        })
      }
    },
    onSuccess: () => {
      router.push(appRoutes.signIn)
      router.refresh()
      toast({
        title: 'Success',
        description: `${toastMessage}`
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    }
  })

  const onSubmit = async (values: NewPasswordFormValues) => {
    await setPassword({ ...values })
  }

  useEffect(() => {
    if (!isSuccess || error) {
      router.push(appRoutes.signIn)
    }
  }, [error, isSuccess, isPending, router])

  return (
    <>
      <div className="flex items-center justify-between">
        <Header title={title} description={description} />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  )
}

export default SetPassword
