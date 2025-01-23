-- CreateEnum
CREATE TYPE "Positions" AS ENUM ('AMBASSADOR', 'BUILDER', 'PSP', 'BASE', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "location" TEXT,
ADD COLUMN     "position" "Positions";
