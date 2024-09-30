/*
  Warnings:

  - You are about to drop the `Projects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Projects";

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "team_leader" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "cover_image" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Enabled',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "relevance" INTEGER NOT NULL,
    "impact_to_society" INTEGER NOT NULL,
    "performance" INTEGER NOT NULL,
    "progress" INTEGER NOT NULL,
    "feedback" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
