-- AlterTable
ALTER TABLE "Gi" ADD COLUMN     "addressId" INTEGER,
ADD COLUMN     "days" TEXT NOT NULL DEFAULT '-',
ADD COLUMN     "hours" TEXT NOT NULL DEFAULT '-';

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "box" TEXT,
    "municpality" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "longitude" TEXT,
    "latitude" TEXT,
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Gi" ADD CONSTRAINT "Gi_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
