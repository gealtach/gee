/*
  Warnings:

  - Added the required column `ch4tons` to the `Rows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `co2tons` to the `Rows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `n2otons` to the `Rows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totais` to the `Rows` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rows" ADD COLUMN     "ch4tons" TEXT NOT NULL,
ADD COLUMN     "co2tons" TEXT NOT NULL,
ADD COLUMN     "n2otons" TEXT NOT NULL,
ADD COLUMN     "totais" TEXT NOT NULL;
