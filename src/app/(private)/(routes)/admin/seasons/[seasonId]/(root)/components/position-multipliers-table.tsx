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
import { cn } from '@/lib/utils'
import { Positions } from '@prisma/client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

type PositionMultiplier = {
  position: Positions
  multiplier: number
}

type PositionMultipliersTableProps = {
  value: PositionMultiplier[]
  onChange: (value: PositionMultiplier[]) => void
}

export const PositionMultipliersTable = ({
  value = [],
  onChange
}: PositionMultipliersTableProps) => {
  const [editingPosition, setEditingPosition] = useState<Positions | null>(null)
  const [editingMultiplier, setEditingMultiplier] = useState<number>(1.0)
  const [errors, setErrors] = useState<{
    multiplier?: string
  }>({})

  const handleEdit = (position: Positions, multiplier: number) => {
    setEditingPosition(position)
    setEditingMultiplier(multiplier)
    setErrors({})
  }

  const handleSave = () => {
    if (!editingPosition) return

    const newErrors: { multiplier?: string } = {}

    if (editingMultiplier < 0) {
      newErrors.multiplier = 'Multiplier must be greater than or equal to 0'
    }
    if (editingMultiplier > 100) {
      newErrors.multiplier = 'Multiplier must be less than or equal to 100'
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    const existingIndex = value.findIndex(pm => pm.position === editingPosition)
    const newMultipliers = [...value]

    if (existingIndex >= 0) {
      newMultipliers[existingIndex] = {
        ...newMultipliers[existingIndex],
        position: editingPosition,
        multiplier: editingMultiplier
      }
    } else {
      newMultipliers.push({
        position: editingPosition,
        multiplier: editingMultiplier
      })
    }

    onChange(newMultipliers)
    setEditingPosition(null)
    setErrors({})
  }

  const handleCancel = () => {
    setEditingPosition(null)
    setErrors({})
  }

  const handleChange = (value: string) => {
    const formattedValue = Number(parseFloat(value).toFixed(2))
    setEditingMultiplier(isNaN(formattedValue) ? 0 : formattedValue)
  }

  return (
    <div className="space-y-2 border border-border rounded-md p-2">
      <Dialog open={editingPosition !== null} onOpenChange={handleCancel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Position Multiplier</DialogTitle>
            <DialogDescription>
              Set the multiplier for <strong>{editingPosition}</strong> position
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Multiplier</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={editingMultiplier}
                onChange={e => {
                  handleChange(e.target.value)
                }}
                className={cn(errors.multiplier && 'border-destructive')}
              />
              {errors.multiplier && (
                <p className="text-sm text-destructive">{errors.multiplier}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSave}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Position</TableHead>
            <TableHead>Multiplier</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.values(Positions).map(position => {
            const multiplier =
              value.find(pm => pm.position === position)?.multiplier ?? 1.0
            return (
              <TableRow key={position}>
                <TableCell>{position}</TableCell>
                <TableCell>{multiplier}</TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      handleEdit(position, multiplier)
                    }}
                    className="h-8 w-8"
                  >
                    <Icons.edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
