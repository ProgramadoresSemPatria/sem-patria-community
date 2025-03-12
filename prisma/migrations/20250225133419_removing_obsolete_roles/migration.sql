/*
  Warnings:

  - The values [PerfilFechado,PortifolioBoostProgram,Builder] on the enum `Roles` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Roles_new" AS ENUM ('PrePsp', 'Base', 'ProgramadorSemPatria', 'Prime', 'Admin');
ALTER TABLE "Classroom" ALTER COLUMN "permissions" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Roles_new"[] USING ("role"::text::"Roles_new"[]);
ALTER TABLE "Classroom" ALTER COLUMN "permissions" TYPE "Roles_new"[] USING ("permissions"::text::"Roles_new"[]);
ALTER TYPE "Roles" RENAME TO "Roles_old";
ALTER TYPE "Roles_new" RENAME TO "Roles";
DROP TYPE "Roles_old";
ALTER TABLE "Classroom" ALTER COLUMN "permissions" SET DEFAULT ARRAY[]::"Roles"[];
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT ARRAY[]::"Roles"[];
COMMIT;
