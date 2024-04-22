import { Icons } from '@/components/icons'
import { toast } from '@/components/ui/use-toast'
import { uploadFiles } from '@/lib/uploadthing'
import { createImageUpload } from 'novel/plugins'

const onUpload = async (file: File) => {
  toast({
    title: 'Uploading image',
    action: <Icons.loader className="ml-auto w-6 h-6 animate-spin" />,
    duration: 5000
  })

  const imageUploadResponse = await uploadFiles('imageUploader', {
    files: [file]
  })

  if (!imageUploadResponse?.length) {
    toast({
      variant: 'destructive',
      title: 'An error occurred while uploading the image.'
    })
    return ''
  }

  toast({
    title: 'Success!',
    description: '🎉 Image uploaded successfully'
  })

  return imageUploadResponse[0].url
}

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: file => {
    if (!file.type.includes('image/')) {
      toast({ variant: 'destructive', title: 'File type not supported.' })
      return false
    } else if (file.size / 1024 / 1024 > 20) {
      toast({
        variant: 'destructive',
        title: 'File size too big (max 20MB).'
      })
      return false
    }
    return true
  }
})
