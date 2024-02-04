-- DropForeignKey
ALTER TABLE "Gi" DROP CONSTRAINT "Gi_secteurId_fkey";

-- AlterTable
ALTER TABLE "Gi" ALTER COLUMN "secteurId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Gi" ADD CONSTRAINT "Gi_secteurId_fkey" FOREIGN KEY ("secteurId") REFERENCES "Secteur"("id") ON DELETE SET NULL ON UPDATE CASCADE;
