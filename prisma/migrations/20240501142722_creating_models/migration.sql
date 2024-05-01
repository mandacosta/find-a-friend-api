-- CreateEnum
CREATE TYPE "Type" AS ENUM ('DOG', 'CAT');

-- CreateEnum
CREATE TYPE "Energy" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE');

-- CreateEnum
CREATE TYPE "Independency" AS ENUM ('ONE', 'TWO', 'THREE');

-- CreateEnum
CREATE TYPE "Age" AS ENUM ('PUPPY', 'GROWNUP', 'VETERAN');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('TINY', 'SMALL', 'MEDIUM', 'BIG');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'DOG',
    "age" "Age" NOT NULL DEFAULT 'GROWNUP',
    "energy" "Energy" NOT NULL DEFAULT 'THREE',
    "size" "Size" NOT NULL DEFAULT 'MEDIUM',
    "independency" "Independency" NOT NULL DEFAULT 'TWO',
    "org_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "additional_info" TEXT,
    "whatsapp_phone" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restrictions" (
    "id" TEXT NOT NULL,
    "restriction" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "restrictions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restrictions" ADD CONSTRAINT "restrictions_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
