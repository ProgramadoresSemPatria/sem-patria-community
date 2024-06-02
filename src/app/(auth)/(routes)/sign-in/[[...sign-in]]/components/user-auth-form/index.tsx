'use client'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type Dispatch, type SetStateAction } from 'react'
import { useUserAuthForm } from './use-user-auth-form'

interface UserAuthFormProps {
  redirectUrl: string
  setActiveStep: Dispatch<SetStateAction<number>>
}

const UserAuthForm = ({ redirectUrl, setActiveStep }: UserAuthFormProps) => {
  const {
    form,
    onSubmit,
    isPending,
    isSuccess,
    showPassword,
    toggleShowPassword
  } = useUserAuthForm({
    redirectUrl
  })

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">
        Login to community
      </h1>
      <p className="text-sm text-muted-foreground">
        Enter your credentials to access your account
      </p>
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
                  <div className="flex flex-col items-end gap-1">
                    <Input
                      {...field}
                      id="password"
                      placeholder="********"
                      type={showPassword ? 'text' : 'password'}
                      disabled={isPending}
                      icon={
                        showPassword ? (
                          <Icons.eyeOff
                            className="h-4 w-4 cursor-pointer"
                            onClick={toggleShowPassword}
                          />
                        ) : (
                          <Icons.eye
                            className="h-4 w-4 cursor-pointer"
                            onClick={toggleShowPassword}
                          />
                        )
                      }
                    />
                    <Button
                      size="sm"
                      variant="link"
                      onClick={() => {
                        setActiveStep(1)
                      }}
                    >
                      Forgot your password?
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending || !form.formState.isValid}
            data-signedin={isSuccess}
            className="mt-6 gap-1 data-[signedin=true]:bg-green-500 data-[signedin=true]:text-white transition-colors"
          >
            {isPending ? (
              <>
                <Icons.loader className="h-4 w-4 mr-2 animate-spin" /> Signing
                In
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
      <p className="text-sm text-muted-foreground">
        If you have any issues logging in, please contact support
      </p>
    </>
  )
}

export default UserAuthForm
