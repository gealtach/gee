-- CreateTable
CREATE TABLE "RowCombEst2" (
    "id" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "combustivel" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "CO2" TEXT NOT NULL,
    "CH4" TEXT NOT NULL,
    "N2O" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "RowCombEst2_pkey" PRIMARY KEY ("id")
);
