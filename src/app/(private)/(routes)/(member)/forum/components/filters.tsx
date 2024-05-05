'use client'
import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useCategory } from '@/hooks/category/use-category'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const ForumFilters = () => {
  const { categories } = useCategory()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [openCategory, setOpenCategory] = useState(false)
  const [openOrderBy, setOpenOrderBy] = useState(false)
  const orderByOptions = [
    {
      id: 'datenew',
      value: 'New in'
    },
    {
      id: 'dateold',
      value: 'Old ones'
    },
    {
      id: 'likes',
      value: 'Most likes'
    }
  ]
  const [categoryName, setCategoryName] = useState('All')
  const [orderBy, setOrderBy] = useState('')

  const categoryOptions =
    categories && categories.length > 0
      ? [
          {
            id: 'all',
            name: 'All'
          },
          ...categories
        ]
      : []

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
  return (
    <div className="flex py-2 gap-x-2">
      <Popover open={openCategory} onOpenChange={setOpenCategory}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCategory}
            className="flex w-fit justify-between border-dashed hover:cursor-pointer gap-x-2"
          >
            {'Category...'}
            <Icons.arrowUpDown className=" h-4 w-4 shrink-0 opacity-50" />
            {categoryName && (
              <Badge className="bg-slate-900 text-white">
                {searchParams.get('category') || categoryName}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search category..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {categoryOptions.map(category => (
                <CommandItem
                  className="line-clamp-1"
                  key={category.name}
                  value={category.name}
                  onSelect={currentValue => {
                    // console.log(categoryOptions)
                    console.log(category.name)
                    setCategoryName(category.name)
                    setOpenCategory(false)
                    router.push(
                      `/forum?category=${category.name}${
                        searchParams.get('orderBy')
                          ? `&orderBy=${searchParams.get('orderBy')}`
                          : ''
                      }`
                    )
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      categoryName === category.name
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={openOrderBy} onOpenChange={setOpenOrderBy}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openOrderBy}
            className="flex w-fit justify-between border-dashed hover:cursor-pointer gap-x-2"
          >
            {'Order by...'}
            <Icons.arrowUpDown className=" h-4 w-4 shrink-0 opacity-50" />
            {orderBy && (
              <Badge className="bg-slate-900  text-white">{orderBy}</Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandGroup>
              {orderByOptions.map(orderByOption => (
                <CommandItem
                  className="line-clamp-1"
                  key={orderByOption.id}
                  value={orderByOption.id}
                  onSelect={currentValue => {
                    handleSelect(currentValue)
                    setOpenOrderBy(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      orderBy === orderByOption.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {orderByOption.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <Button
        onClick={() => {
          setCategoryName('All')
          setOrderBy('')
          router.push(`/forum?category=All`)
        }}
        variant="ghost"
        className="border-dashed border"
      >
        Reset
        <Icons.close className="ml-2" size={15} />
      </Button>
    </div>
  )
}

export default ForumFilters
