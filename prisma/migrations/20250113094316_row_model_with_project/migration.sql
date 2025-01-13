/*
  Warnings:

  - Added the required column `projetoId` to the `Rows` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rows" ADD COLUMN     "projetoId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Rows" ADD CONSTRAINT "Rows_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projetos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
