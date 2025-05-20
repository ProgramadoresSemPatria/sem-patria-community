/*
  Warnings:

  - A unique constraint covering the columns `[userId,seasonId]` on the table `Scoreboard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "PositionMultiplier" (
    "id" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "position" "Positions" NOT NULL,
    "multiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,

    CONSTRAINT "PositionMultiplier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PositionMultiplier_seasonId_position_key" ON "PositionMultiplier"("seasonId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Scoreboard_userId_seasonId_key" ON "Scoreboard"("userId", "seasonId");

-- AddForeignKey
ALTER TABLE "PositionMultiplier" ADD CONSTRAINT "PositionMultiplier_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
