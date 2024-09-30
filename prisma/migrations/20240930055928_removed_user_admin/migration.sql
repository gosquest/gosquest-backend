/*
  Warnings:

  - You are about to drop the `AdminUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdminUser" DROP CONSTRAINT "AdminUser_roleId_fkey";

-- DropTable
DROP TABLE "AdminUser";
