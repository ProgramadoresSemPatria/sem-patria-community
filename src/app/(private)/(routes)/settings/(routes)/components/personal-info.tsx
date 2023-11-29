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
import { useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  level: z.string().min(1)
})

type PersonalInfoFormValues = z.infer<typeof formSchema>

export const PersonalInfo = () => {
  const { isLoaded, user } = useUser()

  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = (values: PersonalInfoFormValues) => {
    console.log(values)
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
            <div className="flex flex-col gap-y-6">
              <Avatar>
                <AvatarImage src={`https://github.com/${user.username}.png`} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="grid grid-cols-2 items-center gap-1.5">
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
                    value={user.fullName || ''}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 items-center gap-1.5">
                <div className="grid items-center gap-1.5">
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
                    <FormItem>
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
                Save changes
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
