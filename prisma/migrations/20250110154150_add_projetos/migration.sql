/*
  Warnings:

  - You are about to drop the `ProjetosCombustaoEstacionaria` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjetosCombustaoEstacionaria" DROP CONSTRAINT "ProjetosCombustaoEstacionaria_userId_fkey";

-- DropTable
DROP TABLE "ProjetosCombustaoEstacionaria";

-- CreateTable
CREATE TABLE "Projetos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Projetos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Projetos" ADD CONSTRAINT "Projetos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
