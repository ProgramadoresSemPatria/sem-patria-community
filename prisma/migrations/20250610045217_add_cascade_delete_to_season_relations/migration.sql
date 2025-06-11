-- DropForeignKey
ALTER TABLE "PositionMultiplier" DROP CONSTRAINT "PositionMultiplier_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "ScoreHistory" DROP CONSTRAINT "ScoreHistory_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "Scoreboard" DROP CONSTRAINT "Scoreboard_seasonId_fkey";

-- AddForeignKey
ALTER TABLE "PositionMultiplier" ADD CONSTRAINT "PositionMultiplier_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scoreboard" ADD CONSTRAINT "Scoreboard_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreHistory" ADD CONSTRAINT "ScoreHistory_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;
