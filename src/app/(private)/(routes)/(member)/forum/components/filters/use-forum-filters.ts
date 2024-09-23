import { useCategory } from '@/hooks/category/use-category'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { orderByOptions } from '.'

export const useForumFilters = () => {
  const { categories, isLoadingCategories } = useCategory()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [openCategory, setOpenCategory] = useState(false)
  const [openOrderBy, setOpenOrderBy] = useState(false)
  const [categoryName, setCategoryName] = useState('All')
  const [orderBy, setOrderBy] = useState('')
  const [search, setSearch] = useState('')

  const handleSelect = (selectedId: string) => {
    const selectedOption = orderByOptions.find(
      option => option.id === selectedId
    )

    if (selectedOption) {
      setOrderBy(selectedOption.value)
      router.push(
        `/forum?category=${searchParams.get('category')}&orderBy=${
          selectedOption.id
        }`
      )
    }
  }

  const onOpenCategory = (value: boolean) => {
    setOpenCategory(value)
  }

  const handleSetCategoryName = (name: string) => {
    setCategoryName(name)
  }

  const onOpenOrderBy = (value: boolean) => {
    setOpenOrderBy(value)
  }

  const handleSetOrderBy = (value: string) => {
    setOrderBy(value)
  }

  const handleSearch = (query: string) => {
    const normalizedQuery = encodeURI(query)
    setSearch(normalizedQuery)
    if (searchParams.get('search') === query) {
      return
    }
    router.push(
      `/forum?category=${searchParams.get('category')}${
        query ? `&search=${normalizedQuery}` : ''
      }`
    )
  }

  return {
    categories,
    openCategory,
    onOpenCategory,
    categoryName,
    searchParams,
    handleSetCategoryName,
    openOrderBy,
    onOpenOrderBy,
    router,
    orderBy,
    handleSelect,
    handleSetOrderBy,
    isLoadingCategories,
    handleSearch,
    search
  }
}
