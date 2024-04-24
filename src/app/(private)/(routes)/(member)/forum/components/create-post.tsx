'use client'
import { Icons } from '@/components/icons'
import CreatePostModal from '@/components/modals/create-post-modal'
import { Input } from '@/components/ui/input'
import useCreatePostModalStore from '@/hooks/modal/use-create-post'
import React from 'react'
import FiltersModal from '@/components/modals/filters-modal'
import useFiltersModalStore from '@/hooks/modal/use-filters-modal'

function CreatePostComponent() {
  const { isOpen, onOpen } = useCreatePostModalStore()
  const { isOpen: isFiltersOpen, onOpen: onOpenFilters } =
    useFiltersModalStore()

  return (
    <div className="flex items-center justify-between py-2">
      <Input
        className="w-[97%]"
        placeholder="What is on your mind?"
        onFocus={() => {
          onOpen()
        }}
      />
      <Icons.settings
        onClick={() => {
          onOpenFilters()
        }}
      />
      {isFiltersOpen && <FiltersModal />}

      {isOpen && <CreatePostModal />}
    </div>
  )
}

export default CreatePostComponent
