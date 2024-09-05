import { Icons } from '@/components/icons'
import { toast } from '@/components/ui/use-toast'
import { useDropzone } from 'react-dropzone'

const fileAcceptTypes = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc', '.docx'],
  'application/vnd.ms-excel': ['.xls', '.xlsx'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
    '.xlsx'
  ],
  'application/vnd.oasis.opendocument.spreadsheet': ['.ods'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': [
    '.ppt',
    '.pptx'
  ],
  'text/plain': ['.txt'],
  'application/zip': ['.zip'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/gif': ['.gif'],
  'image/bmp': ['.bmp'],
  'image/tiff': ['.tif', '.tiff'],
  'image/webp': ['.webp']
}

type UploadImageModuleProps = {
  onSetPreviewFiles: (file: File[]) => void
}
export const UploadFilesModule = ({
  onSetPreviewFiles
}: UploadImageModuleProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 10,
    accept: fileAcceptTypes,
    onDrop(acceptedFiles) {
      onSetPreviewFiles(acceptedFiles)
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
        className:
          'border p-5 border-dashed cursor-pointer gap-y-2 border-violet-700 rounded-lg flex flex-col items-center justify-center w-full'
      })}
    >
      <input {...getInputProps()} />
      <Icons.cloudUpload className="h-10 w-10 text-violet-700" />
      <span className="font-semibold mt-2">Drag and drop your files here</span>
      <span className="text-sm text-muted-foreground">
        Accepted formats: .jpg, .png, .jpeg, .pdf, .doc, .docx, .ppt, .pptx,
        .txt, .zip
      </span>
    </div>
  )
}
