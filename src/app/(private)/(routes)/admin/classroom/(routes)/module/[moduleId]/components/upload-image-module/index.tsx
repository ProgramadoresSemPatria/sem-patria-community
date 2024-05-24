import { Icons } from '@/components/icons'
import { toast } from '@/components/ui/use-toast'
import { useDropzone } from 'react-dropzone'

type UploadImageModuleProps = {
  onSetPreviewImage: (file: File) => void
}
export const UploadImageModule = ({
  onSetPreviewImage
}: UploadImageModuleProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    onDrop(acceptedFiles) {
      onSetPreviewImage(acceptedFiles[0])
    },
    onError: () => {
      toast({
        title: 'An error occurred',
        description:
          'Is not possible to upload more than one image, try again.',
        variant: 'destructive'
      })
    }
  })

  return (
    <div
      {...getRootProps({
        className: `border p-5 border-dashed cursor-pointer gap-y-2 border-violet-700 rounded-lg flex flex-col items-center justify-center w-full`
      })}
    >
      <input {...getInputProps()} />
      <Icons.cloudUpload className="h-10 w-10 text-violet-700" />
      <span className="font-semibold mt-2">Drag and drop your image here</span>
      <span className="text-sm text-muted-foreground">
        Only images (.jpg, .png, .jpeg)
      </span>
    </div>
  )
}
