'use client'

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
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { isObjEmpty } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import { type User } from '@prisma/client'
import ImageInput from './image-input'
import LocationInput from './location-input'
import usePersonalInfo from './use-personal-info'

export type PersonalInfoProps = {
  userProps: User
}

export const PersonalInfo = ({ userProps }: PersonalInfoProps) => {
  const { isLoaded, user } = useUser()

  const { form, onSubmit, isUpdating, showPassword, toggleShowPassword } =
    usePersonalInfo({
      userProps: {
        ...userProps,
        imageUrl: userProps.imageUrl || user?.imageUrl || ''
      }
    })

  const { watch, setValue } = form
  const isPublicEmail = watch('isPublicEmail')

  return (
    <div>
      {!isLoaded && <Icons.loader className="h-6 w-6 animate-spin" />}
      {isLoaded && user && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-3xl"
          >
            <div className="flex flex-col gap-y-4 sm:gap-y-6">
              <div className="flex items-center">
                <ImageInput />
                <span className="ml-3 font-semibold">
                  {`${user.fullName || ''} ${
                    userProps.username ? `(@${userProps.username || ''})` : ''
                  }` || ''}
                </span>
              </div>

              {(userProps.username === '' ||
                !userProps.username ||
                !user.username ||
                user.username === '') && (
                <FormField
                  control={form.control}
                  name="username"
                  disabled={isUpdating}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          data-1p-ignore
                          data-lpignore="true"
                          autoComplete="off"
                          data-bwignore
                          placeholder="Username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Do not contains blank spaces and only &apos;_&apos; or
                        &apos;-&apos; as special characters.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              )}
              <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-2 sm:gap-4">
                <FormField
                  control={form.control}
                  name="github"
                  disabled={isUpdating}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub</FormLabel>
                      <FormControl>
                        <Input placeholder="GitHub" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="linkedin"
                  disabled={isUpdating}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input placeholder="LinkedIn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="instagram"
                  disabled={isUpdating}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-2 space-y-0 mt-2">
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input placeholder="Instagram" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-2 sm:gap-4">
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Email"
                    disabled
                    value={user.emailAddresses[0].emailAddress || ''}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="isPublicEmail"
                  disabled={isUpdating}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-2 space-y-0">
                      <FormLabel>Turn Email Public?</FormLabel>
                      <FormControl>
                        <div
                          className="group inline-flex items-center gap-2 h-9 rounded-md border border-input shadow-sm"
                          data-state={isPublicEmail ? 'checked' : 'unchecked'}
                        >
                          <span
                            id="switch-off-label"
                            className="flex-1 cursor-pointer text-right text-sm font-medium group-data-[state=checked]:text-muted-foreground/70"
                            onClick={() => {
                              setValue('isPublicEmail', false)
                            }}
                          >
                            Off
                          </span>
                          <Switch
                            id="is_public_email"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <span
                            id="switch-on-label"
                            className="flex-1 cursor-pointer text-left text-sm font-medium group-data-[state=unchecked]:text-muted-foreground/70"
                            onClick={() => {
                              setValue('isPublicEmail', true)
                            }}
                          >
                            On
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="level"
                  disabled={isUpdating}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-2 space-y-0">
                      <FormLabel>Level</FormLabel>
                      <FormControl>
                        <Select
                          disabled={isUpdating}
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select your level"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="junior">Junior</SelectItem>
                            <SelectItem value="pleno">Pleno</SelectItem>
                            <SelectItem value="senior">Senior</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-2 sm:gap-4 w-full">
                <div className="sm:col-span-2">
                  <LocationInput isUpdating={isUpdating} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-2 sm:gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <Input
                          data-1p-ignore
                          data-lpignore="true"
                          autoComplete="off"
                          data-bwignore
                          type={showPassword.password ? 'text' : 'password'}
                          disabled={isUpdating}
                          placeholder="Old Password"
                          {...field}
                          icon={
                            showPassword.password ? (
                              <Icons.eyeOff
                                className="h-4 w-4 cursor-pointer"
                                onClick={() => {
                                  toggleShowPassword('password')
                                }}
                              />
                            ) : (
                              <Icons.eye
                                className="h-4 w-4 cursor-pointer"
                                onClick={() => {
                                  toggleShowPassword('password')
                                }}
                              />
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          data-1p-ignore
                          data-lpignore="true"
                          autoComplete="off"
                          data-bwignore
                          type={
                            showPassword.passwordConfirmation
                              ? 'text'
                              : 'password'
                          }
                          disabled={isUpdating}
                          placeholder="Confirm Password"
                          icon={
                            showPassword.passwordConfirmation ? (
                              <Icons.eyeOff
                                className="h-4 w-4 cursor-pointer"
                                onClick={() => {
                                  toggleShowPassword('passwordConfirmation')
                                }}
                              />
                            ) : (
                              <Icons.eye
                                className="h-4 w-4 cursor-pointer"
                                onClick={() => {
                                  toggleShowPassword('passwordConfirmation')
                                }}
                              />
                            )
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.passwordConfirmation?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          data-1p-ignore
                          data-lpignore="true"
                          autoComplete="off"
                          data-bwignore
                          type={showPassword.newPassword ? 'text' : 'password'}
                          disabled={isUpdating}
                          placeholder="New Password"
                          icon={
                            showPassword.newPassword ? (
                              <Icons.eyeOff
                                className="h-4 w-4 cursor-pointer"
                                onClick={() => {
                                  toggleShowPassword('newPassword')
                                }}
                              />
                            ) : (
                              <Icons.eye
                                className="h-4 w-4 cursor-pointer"
                                onClick={() => {
                                  toggleShowPassword('newPassword')
                                }}
                              />
                            )
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.newPassword?.message}
                        {form.formState.errors.root?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-fit"
                disabled={!isObjEmpty(form.formState.errors) || isUpdating}
              >
                {isUpdating && (
                  <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isUpdating ? 'Updating' : 'Save changes'}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
