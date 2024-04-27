/*
  Warnings:

  - You are about to drop the column `statut` on the `Gi` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gi" DROP COLUMN "statut",
ADD COLUMN     "status" "GiStatuses" NOT NULL DEFAULT 'INACTIF';
