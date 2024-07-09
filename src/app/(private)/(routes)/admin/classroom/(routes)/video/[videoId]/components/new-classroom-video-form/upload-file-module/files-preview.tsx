import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { type FileWithPreview } from '../use-new-classroom-video-form'

type FilesPreviewProps = {
  files: FileWithPreview[]
  uploadingFiles: boolean
  onRemoveFile: (index: number) => void
}

const FilesPreview: React.FC<FilesPreviewProps> = ({
  files,
  onRemoveFile,
  uploadingFiles
}) => {
  return (
    <>
      {files.length > 0 ? (
        files.map(({ file, preview }, index) => (
          <div
            className="flex justify-between border rounded-md p-2"
            key={index}
          >
            <Link href={preview} target="_blank" className="cursor-pointer">
              <Icons.file className="h-10 w-10 text-gray-500" />
              <span>{file.name}</span>
            </Link>
            <Button
              variant="link"
              className="text-rose-600 !p-0 h-auto text-sm"
              onClick={() => {
                onRemoveFile(index)
              }}
              disabled={uploadingFiles}
              type="button"
            >
              {uploadingFiles ? (
                <Icons.loader className="h-4 w-4 ml-2 animate-spin  text-primary" />
              ) : (
                <Icons.trash className="h-4 w-4 ml-2 text-rose-600" />
              )}
            </Button>
          </div>
        ))
      ) : (
        <span className="font-medium text-sm text-muted-foreground">
          No files uploaded yet.
        </span>
      )}
    </>
  )
}

export default FilesPreview
