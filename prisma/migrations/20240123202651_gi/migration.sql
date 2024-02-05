-- CreateTable
CREATE TABLE "Gi" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "secteurId" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Gi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gi_name_key" ON "Gi"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Gi_secteurId_key" ON "Gi"("secteurId");

-- AddForeignKey
ALTER TABLE "Gi" ADD CONSTRAINT "Gi_secteurId_fkey" FOREIGN KEY ("secteurId") REFERENCES "Secteur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
