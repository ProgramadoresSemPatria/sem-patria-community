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
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <NewCategoryForm initialData={category} />
      </div>
    </div>
  )
}

export default NewCategoryPage
