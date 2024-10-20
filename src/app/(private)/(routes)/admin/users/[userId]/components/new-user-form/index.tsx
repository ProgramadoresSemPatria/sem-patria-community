'use client'

import BackButton from '@/components/back-button'
import Header from '@/components/header'
import { Icons } from '@/components/icons'
import { AlertModal } from '@/components/modals/alert-modal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { appRoutes } from '@/lib/constants'
import { Roles } from '@/lib/types'
import { type User } from '@prisma/client'
import Image from 'next/image'
import { useMemo } from 'react'
import { useNewUserForm } from './use-new-user-form'

type NewUserFormProps = {
  initialData: User | null
}

type Role = keyof typeof Roles

export const NewUserForm = ({ initialData }: NewUserFormProps) => {
  const {
    isAlertModalOpen,
    setIsAlertModalOpen,
    isDeletingUser,
    onDeleteUser,
    isPending,
    title,
    form,
    onSubmit,
    selectedRoles,
    handleSelectedRoles,
    action,
    onEnableUser,
    isEnablingUser
  } = useNewUserForm({ initialData })

  const enableOrDisableUser = useMemo(() => {
    if (initialData) {
      return initialData.isDisabled ? (
        <Button
          disabled={isPending}
          onClick={() => {
            setIsAlertModalOpen(true)
          }}
          className="bg-green-500 text-white hover:bg-green-600"
        >
          <Icons.userCheck className="h-5 w-5 mr-2" /> Enable user
        </Button>
      ) : (
        <Button
          disabled={isPending}
          variant="destructive"
          onClick={() => {
            setIsAlertModalOpen(true)
          }}
        >
          <Icons.userX className="h-5 w-5 mr-2" /> Delete user
        </Button>
      )
    }
  }, [initialData, isPending, setIsAlertModalOpen])

  return (
    <>
      <AlertModal
        isOpen={isAlertModalOpen}
        description={`This action will ${
          initialData?.isDisabled ? 'enable' : 'disable'
        } this user account, are you sure?`}
        confirmationTitle={initialData?.isDisabled ? 'Enable' : 'Delete'}
        loading={isDeletingUser || isEnablingUser}
        onClose={() => {
          setIsAlertModalOpen(false)
        }}
        onConfirm={async () => {
          if (initialData?.isDisabled) {
            await onEnableUser()
            return
          }
          await onDeleteUser()
        }}
      />
      <div className="flex flex-col">
        <div className="flex items-center justify-between w-full">
          {initialData ? (
            <div className="mt-6 mb-4 flex items-center justify-between w-full">
              <div className="flex items-center">
                <BackButton route={appRoutes.admin_users} />

                <div className="flex gap-2 items-center space-x-2">
                  <Image
                    src={initialData.imageUrl || ''}
                    width={50}
                    height={50}
                    alt={initialData.name || ''}
                    className="rounded-full"
                  />
                  <h2 className="text-2xl font-bold tracking-tight">
                    {initialData.name || ''}
                  </h2>
                </div>
              </div>
              {enableOrDisableUser}
            </div>
          ) : (
            <div className="flex items-center gap-x-4">
              <BackButton route={appRoutes.admin_users} />

              <Header title={title} />
            </div>
          )}
        </div>
        <Separator className="mb-6" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="grid grid-cols-3 gap-8">
              <div className="flex flex-col gap-y-4 w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          data-testid="name"
                          disabled={isPending}
                          placeholder="Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Levels</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="level">
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a level"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem
                            data-testid="estagiario"
                            value="estagiario"
                          >
                            Estagiário
                          </SelectItem>
                          <SelectItem data-testid="junior" value="junior">
                            Junior
                          </SelectItem>
                          <SelectItem data-testid="pleno" value="pleno">
                            Pleno
                          </SelectItem>
                          <SelectItem data-testid="senior" value="senior">
                            Senior
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input
                          data-testid="instagram"
                          disabled={isPending}
                          placeholder="Instagram"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  data-testid="submit"
                  disabled={isPending}
                  className="mr-auto mt-2"
                  type="submit"
                >
                  {isPending && (
                    <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {action}
                </Button>
              </div>
              <div className="flex flex-col gap-y-4 w-full">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          data-testid="username"
                          disabled={isPending}
                          placeholder="Username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Github</FormLabel>
                      <FormControl>
                        <Input
                          data-testid="github"
                          disabled={isPending}
                          placeholder="GitHub"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-y-2 w-full">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Roles</FormLabel>
                        {Roles && (
                          <Select disabled={isPending}>
                            <FormControl>
                              <SelectTrigger data-testid="role">
                                <SelectValue
                                  placeholder={
                                    selectedRoles.length > 0
                                      ? `${selectedRoles.length} selected`
                                      : 'Select roles'
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(Roles).map(([key, value]) => (
                                <div
                                  key={key}
                                  className="flex gap-x-2 items-center"
                                >
                                  <Checkbox
                                    data-testid={key}
                                    onCheckedChange={() => {
                                      handleSelectedRoles(key)
                                    }}
                                    key={key}
                                    value={key}
                                    checked={selectedRoles.includes(
                                      key as Role
                                    )}
                                  />
                                  <label>{value}</label>
                                </div>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-wrap gap-1 max-w-full">
                    {selectedRoles.map(role => (
                      <Badge key={role}>
                        {role}{' '}
                        <span
                          className="ml-2 hover:cursor-pointer"
                          onClick={() => {
                            handleSelectedRoles(role)
                          }}
                        >
                          {<Icons.close size={15} />}
                        </span>{' '}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-4 w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          data-testid="email"
                          disabled={isPending}
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input
                          data-testid="linkedin"
                          disabled={isPending}
                          placeholder="LinkedIn"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}
