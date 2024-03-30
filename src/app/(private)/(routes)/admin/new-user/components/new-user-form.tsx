'use client'

import Header from '@/components/header'
import { Icons } from '@/components/icons'
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
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { Roles } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required'
  }),
  username: z.string(),
  email: z
    .string()
    .email({
      message: 'Invalid email'
    })
    .min(1, {
      message: 'Email is required'
    }),
  role: z.array(
    z.enum([
      'PerfilFechado',
      'PortifolioBoostProgram',
      'Base',
      'ProgramadorSemPatria',
      'Prime',
      'Builder',
      'Admin'
    ])
  ),
  level: z.string(),
  github: z.string(),
  instagram: z.string(),
  linkedin: z.string()
})

type NewUserFormValues = z.infer<typeof formSchema>

export const NewUserForm = () => {
  const router = useRouter()
  const { toast } = useToast()
  type Role = keyof typeof Roles
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])

  const title = 'Create user'
  const description = 'Add a new user to the community.'
  const toastMessage = 'User created successfully'
  const action = 'Create user'

  const form = useForm<NewUserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      role: [],
      level: '',
      github: '',
      linkedin: '',
      instagram: ''
    }
  })

  const { mutateAsync: createUser, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      console.log(data)
      return await api.post(`/api/user`, data)
    },
    onSuccess: () => {
      router.push(appRoutes.dashboard)
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

  const handleSelectedRoles = (role: string) => {
    const newSelectedRoles = [...selectedRoles]
    const index = newSelectedRoles.indexOf(role as Role)
    if (index > -1) {
      newSelectedRoles.splice(index, 1)
    } else {
      newSelectedRoles.push(role as Role)
    }
    setSelectedRoles(newSelectedRoles)
  }

  const onSubmit = async (values: NewUserFormValues) => {
    await createUser({ ...values, role: selectedRoles })
  }

  useEffect(() => {}, [selectedRoles])

  return (
    <>
      <div className="flex flex-col">
        <Button
          size="icon"
          variant="link"
          onClick={() => {
            router.push(appRoutes.dashboard)
          }}
          className="font-medium w-fit"
        >
          <Icons.arrowBack className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="flex items-center justify-between">
          <Header title={title} description={description} />
        </div>
        <Separator className="my-6" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="grid grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
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
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a level"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="estagiario">Estagiário</SelectItem>
                        <SelectItem value="junior">Junior</SelectItem>
                        <SelectItem value="pleno">Pleno</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                      </SelectContent>
                    </Select>
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
                        disabled={isPending}
                        placeholder="Github"
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
                    <FormLabel>Linkedin</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Linkedin"
                        {...field}
                      />
                    </FormControl>
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
                        disabled={isPending}
                        placeholder="Instagram"
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
                            <SelectTrigger>
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
                                  onCheckedChange={() => {
                                    handleSelectedRoles(key)
                                  }}
                                  // onCheckedChange={() => {
                                  //   const newSelectedRoles = [...selectedRoles]
                                  //   const index = newSelectedRoles.indexOf(
                                  //     key as Role
                                  //   )
                                  //   if (index > -1) {
                                  //     newSelectedRoles.splice(index, 1)
                                  //   } else {
                                  //     newSelectedRoles.push(key as Role)
                                  //   }
                                  //   setSelectedRoles(newSelectedRoles)
                                  // }}
                                  key={key}
                                  value={key}
                                  checked={selectedRoles.includes(key as Role)}
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
            <Button disabled={isPending} className="ml-auto" type="submit">
              {isPending && (
                <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              {action}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
