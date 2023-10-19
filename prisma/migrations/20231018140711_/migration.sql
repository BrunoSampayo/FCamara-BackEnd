/*
  Warnings:

  - You are about to drop the column `book_id` on the `rent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ISBN]` on the table `books` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[copy_book_id]` on the table `rent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `copy_book_id` to the `rent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "rent" DROP CONSTRAINT "rent_book_id_fkey";

-- DropIndex
DROP INDEX "rent_book_id_key";

-- AlterTable
ALTER TABLE "rent" DROP COLUMN "book_id",
ADD COLUMN     "copy_book_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "books_ISBN_key" ON "books"("ISBN");

-- CreateIndex
CREATE UNIQUE INDEX "rent_copy_book_id_key" ON "rent"("copy_book_id");

-- AddForeignKey
ALTER TABLE "rent" ADD CONSTRAINT "rent_copy_book_id_fkey" FOREIGN KEY ("copy_book_id") REFERENCES "book_copies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
