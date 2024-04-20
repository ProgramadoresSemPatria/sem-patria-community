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
        className="p-0 pb-2 border-dashed border border-violet-600"
        appearance={{
          button:
            'ut-ready:bg-muted ut-ready:hover:bg-slate-700 transition-colors ut-ready:py-2 ut-readying:bg-transparent ut-uploading:!bg-transparent ut-uploading:py-1 h-auto text-sm font-semibold mb-4'
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
            description: `🎉 Upload Completed!`
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
