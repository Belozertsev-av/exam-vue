-- CreateTable
CREATE TABLE "FineType" (
    "id" SERIAL NOT NULL,
    "fine" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "FineType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "number" VARCHAR(6) NOT NULL,
    "name" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fine" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "carId" INTEGER NOT NULL,
    "fineTypeId" INTEGER NOT NULL,

    CONSTRAINT "Fine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FineType_fine_key" ON "FineType"("fine");

-- AddForeignKey
ALTER TABLE "Fine" ADD CONSTRAINT "Fine_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fine" ADD CONSTRAINT "Fine_fineTypeId_fkey" FOREIGN KEY ("fineTypeId") REFERENCES "FineType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
