'use client'

import { Icons } from '@/components/icons'
import {
  AvatarFallback,
  AvatarImage,
  AvatarWithText
} from '@/components/ui/avatar'
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

const personalInfoSchema = z.object({
  userId: z.string(),
  email: z
    .string()
    .min(1, {
      message: 'Email is required.'
    })
    .email({ message: 'Invalid format of email.' }),
  level: z.string(),
  linkedin: z
    .string()
    .url({
      message: 'Invalid format of Url.'
    })
    .refine(value => {
      if (value.length > 0) {
        return value.includes('linkedin.com')
      }
      return true
    }, 'Invalid format of Linkedin Url.'),
  github: z.string(),
  instagram: z.string(),
  username: z
    .string()
    .min(4, {
      message: 'Username must contain at least 4 characters.'
    })
    .trim()
    .refine(
      s => !s.includes(' '),
      'Username can only contain letters, numbers and "_" or "-".'
    )
})

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>

export const PersonalInfo = ({ userProps }: PersonalInfoProps) => {
  const router = useRouter()
  const { isLoaded, user } = useUser()
  const { toast } = useToast()

  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      userId: userProps.id ?? undefined,
      email: userProps.email ?? undefined,
      linkedin: userProps.linkedin ?? undefined,
      github: userProps.github ?? undefined,
      instagram: userProps.instagram ?? undefined,
      level: userProps.level ?? undefined,
      username:
        userProps.username ||
        (userProps.username === '' ? userProps.github ?? undefined : undefined)
    }
  })

  const { mutateAsync: updateUserLevel, isPending: isUpdating } = useMutation({
    mutationFn: async (data: PersonalInfoFormValues) => {
      return await api.patch(`/api/user`, data)
    },
    onSuccess: () => {
      router.refresh()
      toast({
        title: 'Success',
        description: 'Profile updated successfully.'
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong while updating your profile.',
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
            className="w-full max-w-3xl"
          >
            <div className="flex flex-col gap-y-4 sm:gap-y-6">
              <AvatarWithText
                text={
                  `${user.fullName || ''} ${
                    userProps.username ? `(@${userProps.username || ''})` : ''
                  }` || ''
                }
              >
                <AvatarImage src={user?.imageUrl ? user?.imageUrl : ''} />
                <AvatarFallback>CN</AvatarFallback>
              </AvatarWithText>
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
                        <Input placeholder="Username" {...field} />
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
              <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-2 sm:gap-4">
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
