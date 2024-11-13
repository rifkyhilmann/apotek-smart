/*
  Warnings:

  - A unique constraint covering the columns `[kode]` on the table `obat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `obat_kode_key` ON `obat`(`kode`);
