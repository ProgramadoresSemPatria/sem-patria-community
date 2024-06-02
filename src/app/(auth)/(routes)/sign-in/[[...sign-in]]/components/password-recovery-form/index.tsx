'use client'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type Dispatch, type SetStateAction } from 'react'
import { usePasswordRecoveryForm } from './use-password-recovery-form'

interface PasswordRecoveryFormProps {
  setActiveStep: Dispatch<SetStateAction<number>>
}

const PasswordRecoveryForm = ({ setActiveStep }: PasswordRecoveryFormProps) => {
  const { form, onSubmit, isPending, isSuccess, status } =
    usePasswordRecoveryForm({ setActiveStep })

  const buttonStates = {
    idle: {
      text: 'Recover password',
      icon: <Icons.lock className="w-4 h-4" />
    },
    pending: {
      text: 'Recovering password',
      icon: <Icons.loader className="h-4 w-4 mr-2 animate-spin" />
    },
    success: {
      text: 'Password recovery email sent',
      icon: <Icons.check className="w-4 h-4" />
    },
    error: {
      text: 'Error recovering password',
      icon: <Icons.close className="w-4 h-4" />
    }
  }

  return (
    <>
      <Button
        variant="link"
        size="sm"
        onClick={() => {
          setActiveStep(0)
        }}
        className="self-start"
      >
        <Icons.arrowBack className="h-4 w-4" /> Return
      </Button>

      <h1 className="text-2xl font-semibold tracking-tight">
        Recover your password
      </h1>

      <p className="text-muted-foreground text-xs text-center max-w-[80%] self-center">
        Enter your email address and we will send you a link to reset your
        password.
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
                    disabled={isPending || isSuccess}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending || !form.formState.isValid}
            data-success={isSuccess}
            className="mt-6 gap-1 data-[success=true]:bg-green-500 data-[success=true]:text-white transition-colors"
          >
            {buttonStates[status].icon}
            {buttonStates[status].text}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default PasswordRecoveryForm
