import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Roles, type User } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required'
  }),
  username: z
    .string()
    .min(4, {
      message: 'Username must contain at least 4 characters'
    })
    .trim()
    .refine(
      s => !s.includes(' '),
      'Username can only contain letters, numbers and "_" or "-".'
    ),
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

type Role = keyof typeof Roles

type UseNewUserFormProps = {
  initialData?: User | null
}

export const useNewUserForm = ({ initialData }: UseNewUserFormProps) => {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const title = initialData ? 'Edit user' : 'Create user'
  const toastMessage = initialData
    ? 'User updated successfully'
    : 'User created successfully'
  const action = initialData ? 'Save changes' : 'Create user'

  const form = useForm<NewUserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          name: initialData.name || '',
          username: initialData.username || '',
          email: initialData.email || '',
          role: initialData.role || [],
          level: initialData.level || '',
          github: initialData.github || '',
          linkedin: initialData.linkedin || '',
          instagram: initialData.instagram || ''
        }
      : {
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

  const { mutateAsync: deleteUser, isPending: isDeletingUser } = useMutation({
    mutationFn: async () => {
      return await api.delete(`/api/user/${params.userId}`)
    },
    onSuccess: () => {
      router.push(appRoutes.admin_users)
      router.refresh()
      toast({
        title: 'Success',
        description: 'User was deleted successfully.'
      })
    },
    onError: error => {
      console.error('Error deleting user', error)
      toast({
        title: 'Error',
        description: error.message ?? 'Something went wrong.',
        variant: 'destructive'
      })
    }
  })

  const onDeleteUser = async () => {
    try {
      await deleteUser()
    } catch (error) {
      console.log('Error deleting user', error)
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    } finally {
      setIsAlertModalOpen(false)
    }
  }

  const { mutateAsync: createOrUpdateUser, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      if (initialData) {
        return await api.patch('/api/user', {
          ...data,
          userId: params.userId
        })
      }

      return await api.post(`/api/user`, data)
    },
    onSuccess: () => {
      router.push(appRoutes.admin_users)
      router.refresh()
      toast({
        title: 'Success',
        description: `${toastMessage}`
      })
    },
    onError: (error: AxiosError) => {
      console.error('Error creating/updating user', error)
      toast({
        title: 'Error',
        description: error.response?.data
          ? `${error.response?.data as string}`
          : 'Something went wrong.',
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
    await createOrUpdateUser({ ...values, role: selectedRoles })
  }

  useEffect(() => {
    if (initialData) {
      setSelectedRoles(initialData.role)
    }
  }, [initialData])

  return {
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
    action
  }
}
