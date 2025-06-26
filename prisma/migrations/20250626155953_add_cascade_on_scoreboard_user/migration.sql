-- DropForeignKey
ALTER TABLE "Scoreboard" DROP CONSTRAINT "Scoreboard_userId_fkey";

-- AddForeignKey
ALTER TABLE "Scoreboard" ADD CONSTRAINT "Scoreboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
