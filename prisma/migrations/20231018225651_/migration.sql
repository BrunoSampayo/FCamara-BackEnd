/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `book_copies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `books` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `rent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "administration" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "book_copies_id_key" ON "book_copies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "books_id_key" ON "books"("id");

-- CreateIndex
CREATE UNIQUE INDEX "rent_id_key" ON "rent"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");
