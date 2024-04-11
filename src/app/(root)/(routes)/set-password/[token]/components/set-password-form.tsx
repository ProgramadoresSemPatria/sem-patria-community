'use client'
import Header from '@/components/header'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

const SetPasswordForm = ({ params }: { params: { token: string } }) => {
  const router = useRouter()
  const title = 'Set password'
  const toastMessage = 'Password changed successfully'
  const action = 'Set password'

  const form = useForm<NewPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const { error, isSuccess, isPending } = useQuery({
    queryKey: ['set-password'],
    queryFn: async () => await api.get(`/api/auth/${params.token}`)
  })

  const { mutateAsync: setPassword } = useMutation({
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
    if (error) {
      router.push(appRoutes.signIn)
    }
  }, [error, isSuccess, isPending, router])

  return (
    <>
      <div className="flex items-center justify-between">
        <Header title={title} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
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
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={isPending}
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} className="ml-auto" type="submit">
            {isPending && (
              <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default SetPasswordForm
