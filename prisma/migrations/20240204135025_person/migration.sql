-- AlterTable
ALTER TABLE "Secteur" ADD COLUMN     "personId" INTEGER;

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "isPilote" BOOLEAN NOT NULL,
    "giId" INTEGER,
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Secteur" ADD CONSTRAINT "Secteur_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_giId_fkey" FOREIGN KEY ("giId") REFERENCES "Gi"("id") ON DELETE SET NULL ON UPDATE CASCADE;
