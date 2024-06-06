-- DropForeignKey
ALTER TABLE "Fine" DROP CONSTRAINT "Fine_carId_fkey";

-- DropForeignKey
ALTER TABLE "Fine" DROP CONSTRAINT "Fine_fineTypeId_fkey";

-- AlterTable
ALTER TABLE "Fine" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Fine" ADD CONSTRAINT "Fine_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fine" ADD CONSTRAINT "Fine_fineTypeId_fkey" FOREIGN KEY ("fineTypeId") REFERENCES "FineType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
