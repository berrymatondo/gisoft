-- AlterTable
ALTER TABLE "Meeting" ADD COLUMN     "notes" TEXT,
ADD COLUMN     "onLine" BOOLEAN NOT NULL DEFAULT true;
