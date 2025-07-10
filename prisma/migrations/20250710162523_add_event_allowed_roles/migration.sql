-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "allowedRoles" "Roles"[] DEFAULT ARRAY['ProgramadorSemPatria']::"Roles"[];
