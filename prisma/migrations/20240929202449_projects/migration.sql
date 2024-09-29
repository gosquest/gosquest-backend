-- CreateTable
CREATE TABLE "Projects" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "team_leader" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "cover_image" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Projects_name_key" ON "Projects"("name");
