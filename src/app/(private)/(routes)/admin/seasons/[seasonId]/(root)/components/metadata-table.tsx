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
import { useCallback, useMemo, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { z } from 'zod'

const MAX_AWARDS = 10
const MAX_DESCRIPTION_LENGTH = 50000

const awardSchema = z.object({
  position: z
    .string()
    .min(1, 'Position is required')
    .max(100, 'Position is too long'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(300, 'Description is too long')
})

type Award = z.infer<typeof awardSchema>

type Metadata = {
  awards?: Award[]
  description?: string
}

type MetadataTableProps = {
  value: Metadata | null
  onChange: (value: Metadata) => void
  isLoading?: boolean
  maxAwards?: number
}

export const MetadataTable = ({
  value = { awards: [], description: '' },
  onChange,
  isLoading = false,
  maxAwards = MAX_AWARDS
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

  const awards = useMemo(() => value?.awards || [], [value?.awards])

  const handleAdd = useCallback(() => {
    if (awards.length >= maxAwards) {
      setErrors({ position: `Maximum of ${maxAwards} awards allowed` })
      return
    }
    setEditingIndex(-1)
    setEditingAward({ position: '', description: '' })
    setErrors({})
  }, [awards.length, maxAwards])

  const handleEdit = useCallback(
    (index: number) => {
      if (!awards[index]) return
      setEditingIndex(index)
      setEditingAward(awards[index])
      setErrors({})
    },
    [awards]
  )

  const handleDelete = useCallback(
    (index: number) => {
      onChange({
        ...value,
        awards: awards.filter((_, i) => i !== index)
      })
    },
    [awards, onChange, value]
  )

  const validateAward = useCallback(
    (award: Award) => {
      try {
        awardSchema.parse(award)
        // Check for duplicate positions
        const isDuplicate = awards.some(
          (a, i) => a.position === award.position && i !== editingIndex
        )
        if (isDuplicate) {
          setErrors({ position: 'Position already exists' })
          return false
        }
        setErrors({})
        return true
      } catch (error) {
        if (error instanceof z.ZodError) {
          const newErrors: { position?: string; description?: string } = {}
          error.errors.forEach(err => {
            if (err.path[0] === 'position') newErrors.position = err.message
            if (err.path[0] === 'description')
              newErrors.description = err.message
          })
          setErrors(newErrors)
        }
        return false
      }
    },
    [awards, editingIndex]
  )

  const handleSave = useCallback(() => {
    if (!validateAward(editingAward)) return

    if (editingIndex === -1) {
      onChange({
        ...value,
        awards: [...awards, editingAward]
      })
    } else if (editingIndex !== null) {
      const newAwards = [...awards]
      newAwards[editingIndex] = editingAward
      onChange({
        ...value,
        awards: newAwards
      })
    }
    setEditingIndex(null)
    setErrors({})
  }, [editingAward, editingIndex, onChange, validateAward, value, awards])

  const handleCancel = useCallback(() => {
    setEditingIndex(null)
    setErrors({})
  }, [])

  const handleChange = useCallback(
    (field: keyof Award, newValue: string) => {
      setEditingAward(prev => ({ ...prev, [field]: newValue }))
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }))
      }
    },
    [errors]
  )

  const handleDescriptionChange = useCallback(
    (newValue: string) => {
      if (newValue.length > MAX_DESCRIPTION_LENGTH) return
      onChange({
        ...value,
        description: newValue
      })
    },
    [onChange, value]
  )

  if (isLoading) {
    return (
      <div className="space-y-4 border border-border rounded-md p-2 animate-pulse">
        <div className="space-y-2 px-2">
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="h-[100px] bg-muted rounded" />
        </div>
        <Separator />
        <div className="space-y-2 px-2">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-[200px] bg-muted rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 border border-border rounded-md p-2">
      <div className="space-y-2 px-2">
        <h3 className="text-sm font-medium">Season Description</h3>
        <Textarea
          placeholder="Enter a detailed description of the season, including key events and prizes."
          value={value?.description || ''}
          onChange={e => handleDescriptionChange(e.target.value)}
          maxLength={MAX_DESCRIPTION_LENGTH}
          className="min-h-[100px]"
        />
        <p className="text-xs text-muted-foreground">
          {value?.description?.length || 0}/{MAX_DESCRIPTION_LENGTH} characters
        </p>
      </div>

      <Separator />

      <div className="space-y-2 px-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Awards</h3>
          {awards.length >= 1 && (
            <Button
              type="button"
              size="sm"
              onClick={handleAdd}
              className="h-8"
              disabled={awards.length >= maxAwards}
            >
              <Icons.plus className="h-4 w-4 mr-1" />
              Add award
            </Button>
          )}
        </div>

        {editingIndex !== null && (
          <div className="flex flex-col gap-4 p-4 border rounded-md">
            <h3 className="flex items-center gap-2 text-base font-medium">
              <Icons.edit className="h-4 w-4" /> Editing Award
            </h3>
            <div className="space-y-1">
              <Input
                placeholder="Enter position (e.g., 1st place, 2nd place)"
                value={editingAward.position}
                onChange={e => handleChange('position', e.target.value)}
                className={cn('h-8', errors.position && 'border-destructive')}
                maxLength={100}
              />
              {errors.position && (
                <p className="text-sm text-destructive">{errors.position}</p>
              )}
            </div>
            <div className="space-y-1">
              <Textarea
                placeholder="Enter a description of the award (e.g., 1st place prize)"
                value={editingAward.description}
                onChange={e => handleChange('description', e.target.value)}
                maxLength={300}
                className={cn(
                  'min-h-[80px]',
                  errors.description && 'border-destructive'
                )}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
              <p className="text-xs text-muted-foreground">
                {editingAward.description.length}/300 characters
              </p>
            </div>
            <div className="flex gap-4 justify-end">
              <Button type="button" size="sm" onClick={handleSave}>
                <Icons.checkSimple className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleCancel}
              >
                <Icons.close className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        )}

        {awards.length === 0 && editingIndex === null ? (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <div className="rounded-full bg-muted p-3">
              <Icons.award className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No awards yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Add awards to recognize achievements in this season.
            </p>
            <Button
              type="button"
              size="sm"
              onClick={handleAdd}
              className="mt-4"
            >
              <Icons.plus className="h-4 w-4 mr-1" />
              Add award
            </Button>
          </div>
        ) : (
          <Table id="awards-table">
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {awards.map((award, index) => (
                <TableRow key={index}>
                  <TableCell>{award.position}</TableCell>
                  <TableCell className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
                    {award.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(index)}
                        className="h-8 w-8"
                      >
                        <Icons.edit className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(index)}
                        className="h-8 w-8 text-red-600 hover:bg-transparent"
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
        {awards.length === 0 && editingIndex === -1 && (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              No awards to display.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
