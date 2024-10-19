import { auth } from '@clerk/nextjs/server'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: '16MB', maxFileCount: 4 },
    pdf: { maxFileSize: '64MB', maxFileCount: 4 },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
      maxFileSize: '64MB',
      maxFileCount: 4
    },
    'application/vnd.ms-excel': { maxFileSize: '64MB', maxFileCount: 4 },
    'application/vnd.oasis.opendocument.spreadsheet': {
      maxFileSize: '64MB',
      maxFileCount: 4
    },
    'text/csv': { maxFileSize: '64MB', maxFileCount: 4 },
    'text/tab-separated-values': { maxFileSize: '64MB', maxFileCount: 4 },
    'application/octet-stream': { maxFileSize: '64MB', maxFileCount: 4 }
  })
    .middleware(() => {
      const user = auth()

      if (!user) throw new UploadThingError('Unauthorized') as Error

      return { userId: user.userId }
    })
    .onUploadError(error => {
      console.log('Error uploading file', error)
      return error
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.url }
    })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
