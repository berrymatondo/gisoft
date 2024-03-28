-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" DEFAULT 'USER',
ALTER COLUMN "isPilot" SET DEFAULT true;
