/*
  Warnings:

  - The values [PSP] on the enum `Roles` will be removed. If these variants are still used in the database, this will fail.
  - Changed the column `role` on the `User` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Roles_new" AS ENUM ('PerfilFechado', 'PortifolioBoostProgram', 'Base', 'ProgramadorSemPatria', 'Prime', 'Builder', 'Admin');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Roles_new"[] USING ("role"::text::"Roles_new"[]);
ALTER TYPE "Roles" RENAME TO "Roles_old";
ALTER TYPE "Roles_new" RENAME TO "Roles";
DROP TYPE "Roles_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT ARRAY[]::"Roles"[];
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "role" SET DEFAULT ARRAY[]::"Roles"[],
ALTER COLUMN "role" SET DATA TYPE "Roles"[];
