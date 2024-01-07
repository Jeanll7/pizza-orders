/*
  Warnings:

  - You are about to drop the column `produc_id` on the `items` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_produc_id_fkey";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "produc_id",
ADD COLUMN     "product_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
