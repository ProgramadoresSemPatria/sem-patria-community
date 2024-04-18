import { Icons } from '@/components/icons'
import { toast } from '@/components/ui/use-toast'
import { UploadDropzone } from '@/lib/uploadthing'

type UploadImageModuleProps = {
  onSetPreviewImage: (image: string) => void
}
export const UploadImageModule = ({
  onSetPreviewImage
}: UploadImageModuleProps) => {
  return (
    <div className="cursor-pointer">
      <UploadDropzone
        className="border-dashed"
        appearance={{
          button:
            'ut-ready:bg-green-500 bg-muted text-sm mb-4 after:bg-purple-600'
        }}
        content={{
          label: () => {
            return (
              <span className="font-bold text-primary">
                Drag and drop your image
              </span>
            )
          },
          allowedContent: () => {
            return (
              <span className="text-muted-foreground text-sm">Only images</span>
            )
          },
          uploadIcon: () => {
            return <Icons.cloudUpload className="h-10 w-10 mt-4" />
          }
        }}
        endpoint="imageUploader"
        onClientUploadComplete={res => {
          onSetPreviewImage(res[0].url)
          toast({
            title: 'Success',
            description: `Upload Completed!`
          })
        }}
        onUploadError={(error: Error) => {
          toast({
            title: 'Error',
            description: `${error.message}`
          })
        }}
      />
    </div>
  )
}
