import { auth } from '@clerk/nextjs'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: '8MB', maxFileCount: 1 },
    pdf: { maxFileSize: '32MB', maxFileCount: 4 }
  })
    .middleware(() => {
      const user = auth()

      if (!user) throw new UploadThingError('Unauthorized') as Error

      return { userId: user.userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.url }
    })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
