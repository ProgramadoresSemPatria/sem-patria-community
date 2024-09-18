-- DropForeignKey
ALTER TABLE "CourseCategory" DROP CONSTRAINT "CourseCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_categoryId_fkey";

-- AlterTable
ALTER TABLE "CourseCategory" ALTER COLUMN "categoryId" SET DEFAULT '01991a88-a92c-49df-a78e-6ef36b4e8dfd';

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "categoryId" SET DEFAULT '01991a88-a92c-49df-a78e-6ef36b4e8dfd';

-- AddForeignKey
ALTER TABLE "CourseCategory" ADD CONSTRAINT "CourseCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
