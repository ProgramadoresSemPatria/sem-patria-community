import Header from '@/components/header'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSetPasswordForm } from './use-set-password-form'

const SetPasswordForm = ({ params }: { params: { token: string } }) => {
  const {
    form,
    onSubmit,
    isLoading,
    isUpdatingPassword,
    showPassword,
    toggleShowPassword
  } = useSetPasswordForm({
    params: { token: params.token }
  })

  return (
    <>
      <div className="flex items-center justify-between">
        <Header title="Update your password" />
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
                    type={showPassword ? 'text' : 'password'}
                    disabled={isLoading}
                    placeholder="Password"
                    {...field}
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
                <FormDescription>
                  Password must be at least 8 characters long.
                </FormDescription>
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
                    type={showPassword ? 'text' : 'password'}
                    disabled={isLoading}
                    placeholder="Confirm Password"
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
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={
              isLoading || isUpdatingPassword || !form.formState.isValid
            }
            className="ml-auto"
            type="submit"
          >
            {isUpdatingPassword && (
              <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Update password
          </Button>
        </form>
      </Form>
    </>
  )
}

export default SetPasswordForm
