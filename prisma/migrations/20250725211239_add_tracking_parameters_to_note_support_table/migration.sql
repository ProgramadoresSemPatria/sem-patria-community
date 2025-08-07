/*
  Warnings:

  - The primary key for the `NoteSupport` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,noteId]` on the table `NoteSupport` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `NoteSupport` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `NoteSupport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NoteSupport" DROP CONSTRAINT "NoteSupport_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "NoteSupport_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "NoteSupport_userId_noteId_key" ON "NoteSupport"("userId", "noteId");
