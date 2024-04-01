'use client'
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
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

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

const SetPassword = ({ params }: { params: { token: string } }) => {
  const router = useRouter()
  const title = 'Set password'
  const description = 'Add your new password'
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

export default SetPassword
// 'use client'
// import React, { useState } from 'react'
// import { useAuth, useSignIn } from '@clerk/nextjs'
// import type { NextPage } from 'next'
// import { useRouter } from 'next/navigation'
// import { Label } from '@/components/ui/label'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'

// const ForgotPasswordPage: NextPage = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [code, setCode] = useState('')
//   const [successfulCreation, setSuccessfulCreation] = useState(false)
//   const [secondFactor, setSecondFactor] = useState(false)
//   const [error, setError] = useState('')

//   const router = useRouter()
//   const { isSignedIn } = useAuth()
//   const { isLoaded, signIn, setActive } = useSignIn()

//   if (!isLoaded) {
//     return null
//   }

//   // If the user is already signed in,
//   // redirect them to the home page
//   if (isSignedIn) {
//     router.push('/')
//   }

//   // Send the password reset code to the user's email
//   async function create(e: React.FormEvent) {
//     e.preventDefault()
//     await signIn
//       ?.create({
//         strategy: 'reset_password_email_code',
//         identifier: email
//       })
//       .then(_ => {
//         setSuccessfulCreation(true)
//         setError('')
//       })
//       .catch(err => {
//         console.error('error', err.errors[0].longMessage)
//         setError(err.errors[0].longMessage)
//       })
//   }

//   // Reset the user's password.
//   // Upon successful reset, the user will be
//   // signed in and redirected to the home page
//   async function reset(e: React.FormEvent) {
//     e.preventDefault()
//     await signIn
//       ?.attemptFirstFactor({
//         strategy: 'reset_password_email_code',
//         code,
//         password
//       })
//       .then(result => {
//         // Check if 2FA is required
//         if (result.status === 'needs_second_factor') {
//           setSecondFactor(true)
//           setError('')
//         } else if (result.status === 'complete') {
//           // Set the active session to
//           // the newly created session (user is now signed in)
//           void setActive({ session: result.createdSessionId })
//           setError('')
//         } else {
//           console.log(result)
//         }
//       })
//       .catch(err => {
//         console.error('error', err.errors[0].longMessage)
//         setError(err.errors[0].longMessage)
//       })
//   }

//   return (
//     <div
//       style={{
//         margin: 'auto',
//         maxWidth: '500px'
//       }}
//     >
//       <h1>Set up your password</h1>
//       <form
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '1em'
//         }}
//         onSubmit={!successfulCreation ? create : reset}
//       >
//         {!successfulCreation && (
//           <>
//             <Label htmlFor="email">Please provide your email address</Label>
//             <Input
//               type="email"
//               placeholder="e.g john@doe.com"
//               value={email}
//               onChange={e => {
//                 setEmail(e.target.value)
//               }}
//             />

//             <Button>Send password reset code</Button>
//             {error && <p>{error}</p>}
//           </>
//         )}

//         {successfulCreation && (
//           <>
//             <label htmlFor="password">Enter your new password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={e => {
//                 setPassword(e.target.value)
//               }}
//             />

//             <label htmlFor="password">
//               Enter the password reset code that was sent to your email
//             </label>
//             <input
//               type="text"
//               value={code}
//               onChange={e => {
//                 setCode(e.target.value)
//               }}
//             />

//             <button>Reset</button>
//             {error && <p>{error}</p>}
//           </>
//         )}

//         {secondFactor && (
//           <p>2FA is required, but this UI does not handle that</p>
//         )}
//       </form>
//     </div>
//   )
// }

// export default ForgotPasswordPage
