-- CreateTable
CREATE TABLE "ProjetosCombustaoEstacionaria" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ProjetosCombustaoEstacionaria_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjetosCombustaoEstacionaria" ADD CONSTRAINT "ProjetosCombustaoEstacionaria_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
