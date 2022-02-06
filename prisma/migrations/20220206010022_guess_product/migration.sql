/*
  Warnings:

  - You are about to drop the `_GuessToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `Guess` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_GuessToProduct" DROP CONSTRAINT "_GuessToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_GuessToProduct" DROP CONSTRAINT "_GuessToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Guess" ADD COLUMN     "productId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_GuessToProduct";

-- AddForeignKey
ALTER TABLE "Guess" ADD CONSTRAINT "Guess_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
