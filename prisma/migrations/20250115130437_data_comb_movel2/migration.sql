/*
  Warnings:

  - You are about to drop the column `KgCH4` on the `DataCombMovel` table. All the data in the column will be lost.
  - You are about to drop the column `KgCO2` on the `DataCombMovel` table. All the data in the column will be lost.
  - Added the required column `kgCH4` to the `DataCombMovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kgCO2` to the `DataCombMovel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DataCombMovel" DROP COLUMN "KgCH4",
DROP COLUMN "KgCO2",
ADD COLUMN     "kgCH4" TEXT NOT NULL,
ADD COLUMN     "kgCO2" TEXT NOT NULL;
