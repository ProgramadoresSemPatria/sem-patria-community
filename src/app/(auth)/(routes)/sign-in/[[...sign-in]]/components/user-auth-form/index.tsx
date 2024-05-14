'use client'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUserAuthForm } from './use-user-auth-form'

const UserAuthForm = ({ redirectUrl }: { redirectUrl: string }) => {
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
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending || !form.formState.isValid}
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
