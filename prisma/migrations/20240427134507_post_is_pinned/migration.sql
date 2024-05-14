/*
  Warnings:

  - Made the column `title` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "isPinned" BOOLEAN DEFAULT false,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "content" SET NOT NULL;
