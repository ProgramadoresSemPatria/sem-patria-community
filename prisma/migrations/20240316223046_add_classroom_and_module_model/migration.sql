/*
  Warnings:

  - You are about to drop the column `duration` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "duration",
DROP COLUMN "projectId",
ADD COLUMN     "classroomModuleId" TEXT;

-- CreateTable
CREATE TABLE "Classroom" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "permissions" "Roles"[] DEFAULT ARRAY[]::"Roles"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassroomModule" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "classroomId" TEXT NOT NULL,

    CONSTRAINT "ClassroomModule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_title_key" ON "Classroom"("title");

-- AddForeignKey
ALTER TABLE "ClassroomModule" ADD CONSTRAINT "ClassroomModule_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_classroomModuleId_fkey" FOREIGN KEY ("classroomModuleId") REFERENCES "ClassroomModule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
