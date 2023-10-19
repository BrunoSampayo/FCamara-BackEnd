/*
  Warnings:

  - You are about to drop the column `adreess_street` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `adress_number` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `adress_state` on the `users` table. All the data in the column will be lost.
  - Added the required column `address_number` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_state` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_street` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "adreess_street",
DROP COLUMN "adress_number",
DROP COLUMN "adress_state",
ADD COLUMN     "address_number" TEXT NOT NULL,
ADD COLUMN     "address_state" TEXT NOT NULL,
ADD COLUMN     "address_street" TEXT NOT NULL;
