-- CreateTable
CREATE TABLE "NoteSupport" (
    "userId" TEXT NOT NULL,
    "noteId" TEXT NOT NULL,

    CONSTRAINT "NoteSupport_pkey" PRIMARY KEY ("userId","noteId")
);

-- AddForeignKey
ALTER TABLE "NoteSupport" ADD CONSTRAINT "NoteSupport_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteSupport" ADD CONSTRAINT "NoteSupport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
