import { DefaultLayout } from '@/components/default-layout'
import prismadb from '@/lib/prismadb'
import { NewCategoryForm } from './components/new-category-form'

const NewCategoryPage = async ({
  params
}: {
  params: { categoryId: string }
}) => {
  const category = await prismadb.category.findUnique({
    where: { id: params.categoryId }
  })

  return (
    <DefaultLayout className="flex-col">
      <NewCategoryForm initialData={category} />
    </DefaultLayout>
  )
}

export default NewCategoryPage
