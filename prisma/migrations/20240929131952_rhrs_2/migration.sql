/*
  Warnings:

  - You are about to drop the `UserAndRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserAndRole" DROP CONSTRAINT "UserAndRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserAndRole" DROP CONSTRAINT "UserAndRole_userId_fkey";

-- DropTable
DROP TABLE "UserAndRole";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
