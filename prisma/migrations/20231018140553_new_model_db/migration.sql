/*
  Warnings:

  - You are about to drop the column `copy_code` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `rent_Day` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[book_id]` on the table `rent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `book_id` to the `rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `return_day` to the `rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "rent" DROP CONSTRAINT "rent_bookId_fkey";

-- DropForeignKey
ALTER TABLE "rent" DROP CONSTRAINT "rent_userId_fkey";

-- DropIndex
DROP INDEX "rent_bookId_key";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "copy_code";

-- AlterTable
ALTER TABLE "rent" DROP COLUMN "bookId",
DROP COLUMN "rent_Day",
DROP COLUMN "userId",
ADD COLUMN     "book_id" TEXT NOT NULL,
ADD COLUMN     "delivered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rent_day" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "return_day" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password",
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "book_copies" (
    "id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,

    CONSTRAINT "book_copies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rent_book_id_key" ON "rent"("book_id");

-- AddForeignKey
ALTER TABLE "book_copies" ADD CONSTRAINT "book_copies_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rent" ADD CONSTRAINT "rent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rent" ADD CONSTRAINT "rent_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book_copies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
