export type SaveChangesNoteBody = {
  title: string
  content?: string
  isPublic: boolean
}

export type GetNotesData = {
  createdAt: string
}
