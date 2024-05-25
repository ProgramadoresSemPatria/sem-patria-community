import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { uploadFiles } from '@/lib/uploadthing'
import { useMutation } from '@tanstack/react-query'
import { type JSONContent } from 'novel'
import { createImageUpload } from 'novel/plugins'
import { Icons } from '../icons'

const useEditorUploadFile = () => {
  const onUpload = async (file: File) => {
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

    return imageUploadResponse[0].url
  }

  const { mutateAsync } = useMutation({
    mutationKey: ['editor-upload-file'],
    mutationFn: async (file: File) => {
      return await onUpload(file)
    },
    onMutate: () => {
      toast({
        title: 'Uploading image',
        action: <Icons.loader className="ml-auto w-6 h-6 animate-spin" />
      })
    },
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: '🎉 Image uploaded successfully'
      })
    }
  })

  const { mutate: mutateDeleteImage } = useMutation({
    mutationKey: ['editor-delete-file'],
    mutationFn: async (imageKey: string) => {
      await api.post('/api/uploadthing/delete', {
        imageKey
      })
    },
    onMutate: () => {
      toast({
        title: 'Deleting image',
        action: <Icons.loader className="ml-auto w-6 h-6 animate-spin" />
      })
    },
    onSuccess: () => {
      toast({
        title: 'Image was deleted!'
      })
    }
  })

  const handleValidateImageWasDeleted = ({
    currentContent,
    previousContent
  }: {
    currentContent: JSONContent[]
    previousContent: JSONContent[]
  }): void => {
    const currentImages = currentContent?.filter(
      block => block.type === 'image'
    )

    const previousImages = previousContent?.filter(
      block => block.type === 'image'
    )

    const deletedImages = previousImages?.filter(
      previousImage =>
        !currentImages.some(
          currentImage => currentImage.attrs?.src === previousImage.attrs?.src
        )
    )

    deletedImages.forEach(image => {
      mutateDeleteImage(image.attrs?.src)
    })
  }

  const uploadFn = createImageUpload({
    onUpload: async file => {
      return await mutateAsync(file)
    },
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

  return { uploadFn, handleValidateImageWasDeleted }
}
export { useEditorUploadFile }
