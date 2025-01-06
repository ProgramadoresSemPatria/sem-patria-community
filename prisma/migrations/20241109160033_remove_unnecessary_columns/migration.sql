/*
  Warnings:

  - You are about to drop the column `color` on the `Interest` table. All the data in the column will be lost.
  - You are about to drop the column `iconUrl` on the `Interest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Interest" DROP COLUMN "color",
DROP COLUMN "iconUrl";
