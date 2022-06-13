/*
  Warnings:

  - You are about to drop the column `furPattern` on the `Cat` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Cat` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Cat` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(20)`.
  - Added the required column `fur_pattern` to the `Cat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `Cat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cat" DROP COLUMN "furPattern",
DROP COLUMN "ownerId",
ADD COLUMN     "fur_pattern" VARCHAR(100) NOT NULL,
ADD COLUMN     "owner_id" VARCHAR(255) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(20);
