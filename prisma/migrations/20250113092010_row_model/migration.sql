-- AlterTable
ALTER TABLE "Projetos" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Rows" (
    "id" TEXT NOT NULL,
    "instalacao" TEXT NOT NULL,
    "fonte" TEXT NOT NULL,
    "combustivel" TEXT NOT NULL,
    "qtd" INTEGER NOT NULL,
    "unidade" TEXT NOT NULL,
    "co2unidade" TEXT NOT NULL,
    "ch4unidade" TEXT NOT NULL,
    "n2ounidade" TEXT NOT NULL,
    "co2ton" TEXT NOT NULL,
    "ch4ton" TEXT NOT NULL,
    "n2oton" TEXT NOT NULL,
    "emissoestotais" TEXT NOT NULL,

    CONSTRAINT "Rows_pkey" PRIMARY KEY ("id")
);
