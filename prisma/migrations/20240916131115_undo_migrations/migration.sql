ALTER TABLE "CourseCategory" ALTER COLUMN "categoryId" DROP DEFAULT;

ALTER TABLE "Post" ALTER COLUMN "categoryId" DROP DEFAULT;

ALTER TABLE "CourseCategory" DROP CONSTRAINT "CourseCategory_categoryId_fkey";

ALTER TABLE "Post" DROP CONSTRAINT "Post_categoryId_fkey";

ALTER TABLE "CourseCategory" ADD CONSTRAINT "CourseCategory_categoryId_fkey" 
FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" 
FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
