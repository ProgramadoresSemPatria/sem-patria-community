'use client'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/icons'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type Award = {
  position: string
  description: string
}

type Metadata = {
  awards?: Award[]
  description?: string
}

type MetadataTableProps = {
  value: Metadata | null
  onChange: (value: Metadata) => void
}

export const MetadataTable = ({
  value = { awards: [], description: '' },
  onChange
}: MetadataTableProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingAward, setEditingAward] = useState<Award>({
    position: '',
    description: ''
  })
  const [errors, setErrors] = useState<{
    position?: string
    description?: string
  }>({})

  const handleAdd = () => {
    setEditingIndex(-1)
    setEditingAward({ position: '', description: '' })
    setErrors({})
  }

  const handleEdit = (index: number) => {
    if (!value?.awards?.[index]) return
    setEditingIndex(index)
    setEditingAward(value.awards[index])
    setErrors({})
  }

  const handleDelete = (index: number) => {
    onChange({
      ...value,
      awards: value?.awards?.filter((_, i) => i !== index)
    })
  }

  const validateAward = (award: Award) => {
    const newErrors: { position?: string; description?: string } = {}

    if (!award.position.trim()) {
      newErrors.position = 'Position is required'
    }

    if (!award.description.trim()) {
      newErrors.description = 'Description is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validateAward(editingAward) || !value?.awards) {
      return
    }
    if (editingIndex === -1) {
      onChange({
        ...value,
        awards: [...value.awards, editingAward]
      })
    } else if (editingIndex !== null) {
      const newAwards = [...value.awards]
      newAwards[editingIndex] = editingAward
      onChange({
        ...value,
        awards: newAwards
      })
    }
    setEditingIndex(null)
    setErrors({})
  }

  const handleCancel = () => {
    setEditingIndex(null)
    setErrors({})
  }

  const handleChange = (field: keyof Award, newValue: string) => {
    setEditingAward(prev => ({ ...prev, [field]: newValue }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleDescriptionChange = (newValue: string) => {
    onChange({
      ...value,
      description: newValue
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Description</h3>
        <Textarea
          placeholder="Enter season description (Max. 600 characters)"
          value={value?.description || ''}
          onChange={e => {
            handleDescriptionChange(e.target.value)
          }}
          maxLength={600}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Awards</h3>
          {(value?.awards || []).length >= 1 && (
            <Button size="sm" onClick={handleAdd} className="h-8">
              <Icons.plus className="h-4 w-4 mr-2" />
              Add Award
            </Button>
          )}
        </div>

        {editingIndex !== null && (
          <div className="flex flex-col gap-2 p-4 border rounded-md">
            <div className="space-y-1">
              <Input
                placeholder="Position"
                value={editingAward.position}
                onChange={e => {
                  handleChange('position', e.target.value)
                }}
                className={cn('h-8', errors.position && 'border-red-500')}
              />
              {errors.position && (
                <p className="text-sm text-red-500">{errors.position}</p>
              )}
            </div>
            <div className="space-y-1">
              <Textarea
                placeholder="Description (Max. 300 characters)"
                value={editingAward.description}
                onChange={e => {
                  handleChange('description', e.target.value)
                }}
                maxLength={300}
                className={cn(
                  'min-h-[80px]',
                  errors.description && 'border-red-500'
                )}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>
            <div className="flex gap-4 justify-end">
              <Button size="icon" onClick={handleSave} className="h-8">
                <Icons.checkSimple className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={handleCancel}
                className="h-8 hover:bg-transparent hover:text-brand-white-900"
              >
                <Icons.close className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {(value?.awards || []).length === 0 && editingIndex === null ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-muted p-3">
              <Icons.award className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No awards yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Add awards to recognize achievements in this season.
            </p>
            <Button size="sm" onClick={handleAdd} className="mt-4 h-8">
              <Icons.plus className="h-4 w-4 mr-2" />
              Add Award
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(value?.awards || []).map((award, index) => (
                <TableRow key={index}>
                  <TableCell>{award.position}</TableCell>
                  <TableCell>{award.description}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          handleEdit(index)
                        }}
                        className="h-8 w-8"
                      >
                        <Icons.edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          handleDelete(index)
                        }}
                        className="h-8 w-8 text-red-500 hover:bg-transparent hover:text-red-700"
                      >
                        <Icons.trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
