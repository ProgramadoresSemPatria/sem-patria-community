-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "isPending" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "isPending" BOOLEAN NOT NULL DEFAULT false;
