'use client'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { useSignIn } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const UserAuthForm = ({ redirectUrl }: { redirectUrl: string }) => {
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
      toast({
        title: 'An error ocurred while signing in',
        description: 'Try again later',
        variant: 'destructive'
      })
    }
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      await mutateAsync(values)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <FormControl>
                <Input
                  {...field}
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <FormControl>
                <Input
                  {...field}
                  id="password"
                  placeholder="********"
                  type="password"
                  disabled={isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={
            !form.formState.isValid ||
            form.formState.isSubmitting ||
            form.formState.isSubmitSuccessful
          }
          data-signedin={isSuccess}
          className="mt-4 gap-1 data-[signedin=true]:bg-green-500 data-[signedin=true]:text-white transition-colors"
        >
          {isPending ? (
            <>
              <Icons.loader className="h-4 w-4 mr-2 animate-spin" /> Signing In
            </>
          ) : isSuccess ? (
            <>
              <Icons.check className="w-4 h-4" /> Redirecting...
            </>
          ) : (
            <>Sign In</>
          )}
        </Button>
      </form>
    </Form>
  )
}

export default UserAuthForm
