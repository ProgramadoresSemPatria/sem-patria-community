/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type ChangeEvent, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Icons } from '@/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toBase64 } from '@/lib/utils'

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer()

  Array.from(event.target.files!).forEach(image =>
    dataTransfer.items.add(image)
  )

  const files = dataTransfer.files
  const displayUrl = URL.createObjectURL(event.target.files![0])

  return { files, displayUrl }
}

const ImageInput = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [preview, setPreview] = useState<string | undefined>()
  const form = useFormContext()

  return (
    <div className="group relative">
      <FormField
        control={form.control}
        name="imageUrl"
        render={({ field: { onChange, value } }) => (
          <FormItem>
            <FormControl>
              <>
                <Avatar className="h-20 w-20 border p-1">
                  <AvatarImage
                    src={preview || value}
                    alt={`${form.getValues('name')}_avatar`}
                    className="rounded-full"
                  />
                  <AvatarFallback>
                    <Icons.user className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <Input
                  type="file"
                  ref={inputRef}
                  onChange={async event => {
                    if (event.target.files && event.target.files.length > 0) {
                      const { files, displayUrl } = getImageData(event)
                      const file = files[0]
                      const base64 = (await toBase64(file)) as string

                      onChange(base64)
                      setPreview(displayUrl)
                    }
                  }}
                  className="hidden"
                  accept="image/*"
                />
              </>
            </FormControl>
          </FormItem>
        )}
      />
      <div
        className="absolute inset-0 z-10 h-20 w-20 flex cursor-pointer flex-col items-center justify-center rounded-full border border-dashed border-slate-300 bg-slate-900/60 font-semibold opacity-0 backdrop-blur-sm transition-all duration-150 ease-out group-hover:opacity-100 text-slate-100"
        onClick={() => inputRef.current?.click()}
      >
        <Icons.edit className="h-6 w-6" />
      </div>
    </div>
  )
}

export default ImageInput
