-- DropForeignKey
ALTER TABLE "CourseCategory" DROP CONSTRAINT "CourseCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CourseCategory" DROP CONSTRAINT "CourseCategory_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_categoryId_fkey";

-- AlterTable
ALTER TABLE "CourseCategory" ALTER COLUMN "categoryId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "discordWebhookMessageID" TEXT,
ALTER COLUMN "categoryId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "CourseCategory" ADD CONSTRAINT "CourseCategory_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseCategory" ADD CONSTRAINT "CourseCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
