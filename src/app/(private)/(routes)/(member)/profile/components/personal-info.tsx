'use client'

import { Icons } from '@/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { type User } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

type PersonalInfoProps = {
  userProps: User
}

const formSchema = z.object({
  level: z.string().min(1)
})

type PersonalInfoFormValues = z.infer<typeof formSchema>

export const PersonalInfo = ({ userProps }: PersonalInfoProps) => {
  const router = useRouter()
  const { isLoaded, user } = useUser()
  const { toast } = useToast()

  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      level: userProps.level ?? undefined
    }
  })

  const { mutateAsync: updateUserLevel, isPending: isUpdating } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return await api.patch(`/api/user`, data)
    },
    onSuccess: () => {
      router.refresh()
      toast({
        title: 'Success',
        description: 'Level updated successfully.'
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong while updating your level.',
        variant: 'destructive'
      })
    }
  })

  const onSubmit = async (values: PersonalInfoFormValues) => {
    await updateUserLevel(values)
  }

  return (
    <div>
      {!isLoaded && <Icons.loader className="h-6 w-6 animate-spin" />}
      {isLoaded && user && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-xl"
          >
            <div className="flex flex-col gap-y-2 sm:gap-y-6">
              <Avatar>
                <AvatarImage src={`https://github.com/${user.username}.png`} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-1.5">
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    id="username"
                    placeholder="Username"
                    disabled
                    value={`@${user.username}` || '@'}
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Name"
                    disabled
                    value={user.fullName ?? ''}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-1.5">
                <div className="flex flex-col  gap-y-2 ">
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
                  name="level"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-2 space-y-0">
                      <FormLabel>Level</FormLabel>
                      <Select
                        disabled={false}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select your level"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="junior">Junior</SelectItem>
                          <SelectItem value="pleno">Pleno</SelectItem>
                          <SelectItem value="senior">Senior</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-fit">
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
