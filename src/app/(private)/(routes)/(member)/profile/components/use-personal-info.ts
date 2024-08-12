import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { type PersonalInfoProps } from './personal-info'

export const personalInfoSchema = z
  .object({
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
      .url()
      .optional()
      .refine(value => {
        if (value && value.length > 0) {
          return value?.includes('linkedin.com')
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
      ),
    imageUrl: z.string().optional(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .optional(),
    passwordConfirmation: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .optional(),
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .optional()
  })
  .superRefine(({ passwordConfirmation, password, newPassword }, ctx) => {
    if (password && !passwordConfirmation) {
      ctx.addIssue({
        code: 'custom',
        path: ['passwordConfirmation'],
        message: 'Provide a password confirmation to update your password.'
      })
    }
    if (passwordConfirmation && password && passwordConfirmation !== password) {
      ctx.addIssue({
        code: 'custom',
        path: ['passwordConfirmation'],
        message: 'Passwords did not match'
      })
    }
    if (passwordConfirmation && password && !newPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['newPassword'],
        message: 'Provide a new password to update your password.'
      })
    }
  })

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>

const usePersonalInfo = ({ userProps }: PersonalInfoProps) => {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<PersonalInfoFormValues>({
    mode: 'onSubmit',
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
        (userProps.username === '' ? userProps.github ?? undefined : undefined),
      imageUrl: userProps.imageUrl ?? undefined
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

  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return {
    form,
    onSubmit,
    isUpdating,
    showPassword,
    toggleShowPassword
  }
}

export default usePersonalInfo
