'use server'
import { toast } from '@/components/ui/use-toast'
import prismadb from '@/lib/prismadb'

export const getCategory = async (categoryId: string) => {
  try {
    const category = await prismadb.category.findFirst({
      where: {
        id: categoryId
      }
    })
    return category
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Something went wrong',
      variant: 'destructive'
    })
  }
}
