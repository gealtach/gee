-- CreateTable
CREATE TABLE "CombustivelData" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "kgCO2" INTEGER NOT NULL,
    "kgCH4" INTEGER NOT NULL,
    "kgN2O" INTEGER NOT NULL,
    "categoria" TEXT NOT NULL,

    CONSTRAINT "CombustivelData_pkey" PRIMARY KEY ("id")
);
