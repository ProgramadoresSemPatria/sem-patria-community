/*
  Warnings:

  - You are about to drop the column `type` on the `CommentLike` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Like` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CommentLike" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "type";

-- DropEnum
DROP TYPE "VoteType";
