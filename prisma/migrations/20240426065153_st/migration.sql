/*
  Warnings:

  - You are about to drop the column `status` on the `Gi` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gi" DROP COLUMN "status",
ADD COLUMN     "statut" "GiStatuses" NOT NULL DEFAULT 'INACTIF';
