/*
  Warnings:

  - You are about to drop the column `ch4ton` on the `Rows` table. All the data in the column will be lost.
  - You are about to drop the column `co2ton` on the `Rows` table. All the data in the column will be lost.
  - You are about to drop the column `emissoestotais` on the `Rows` table. All the data in the column will be lost.
  - You are about to drop the column `n2oton` on the `Rows` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Rows" DROP COLUMN "ch4ton",
DROP COLUMN "co2ton",
DROP COLUMN "emissoestotais",
DROP COLUMN "n2oton";
