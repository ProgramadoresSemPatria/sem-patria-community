-- CreateTable
CREATE TABLE "UserFollowersAndFollowing" (
    "id" TEXT NOT NULL,
    "follow_user_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserFollowersAndFollowing_pkey" PRIMARY KEY ("id")
);
