import React from 'react'
import { Modal } from '@/components/ui/modal'
import useFiltersModalStore from '@/hooks/modal/use-filters-modal'
import ForumFilters from '@/app/(private)/(routes)/(member)/forum/components/filters'

const FiltersModal = () => {
  const { isOpen, onClose } = useFiltersModalStore()

  return (
    <>
      <Modal
        title="Filters"
        description="Select forum filters"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ForumFilters />
      </Modal>
    </>
  )
}

export default FiltersModal
