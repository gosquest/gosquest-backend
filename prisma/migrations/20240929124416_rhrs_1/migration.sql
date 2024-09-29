/*
  Warnings:

  - You are about to drop the column `birthDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `facebookId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `googleId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sector` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `whatsappNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserVerificationCodes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[fullName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_phoneNumber_key";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "birthDate",
DROP COLUMN "country",
DROP COLUMN "district",
DROP COLUMN "email",
DROP COLUMN "facebookId",
DROP COLUMN "googleId",
DROP COLUMN "password",
DROP COLUMN "phoneNumber",
DROP COLUMN "profilePicture",
DROP COLUMN "province",
DROP COLUMN "sector",
DROP COLUMN "username",
DROP COLUMN "verified",
DROP COLUMN "whatsappNumber",
ADD COLUMN     "code" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserVerificationCodes";

-- CreateIndex
CREATE UNIQUE INDEX "User_fullName_key" ON "User"("fullName");
