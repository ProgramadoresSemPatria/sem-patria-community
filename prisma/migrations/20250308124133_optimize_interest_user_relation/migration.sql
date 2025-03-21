/*
  Warnings:

  - The primary key for the `_InterestToUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_InterestToUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "_InterestToUser" DROP CONSTRAINT "_InterestToUser_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_InterestToUser_AB_unique" ON "_InterestToUser"("A", "B");
