/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Secteur` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Secteur_name_key" ON "Secteur"("name");
