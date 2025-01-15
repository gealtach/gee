-- CreateTable
CREATE TABLE "DataCombMovel" (
    "id" TEXT NOT NULL,
    "combustivel" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "KgCO2" TEXT NOT NULL,
    "KgCH4" TEXT NOT NULL,
    "kgN2O" TEXT NOT NULL,

    CONSTRAINT "DataCombMovel_pkey" PRIMARY KEY ("id")
);
