-- CreateTable
CREATE TABLE `penjualan` (
    `id` VARCHAR(191) NOT NULL,
    `faktur` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `waktu` DATETIME(3) NOT NULL,
    `pembayaran` VARCHAR(191) NOT NULL,
    `total` DOUBLE NOT NULL,
    `total_laba` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `penjualan_faktur_key`(`faktur`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_items` (
    `id` VARCHAR(191) NOT NULL,
    `faktur_id` VARCHAR(191) NOT NULL,
    `obat_id` VARCHAR(191) NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `total_laba` DOUBLE NOT NULL,
    `total` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pembelian` (
    `id` VARCHAR(191) NOT NULL,
    `faktur` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `suplier` VARCHAR(191) NOT NULL,
    `total` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `pembelian_faktur_key`(`faktur`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pembelian_item` (
    `id` VARCHAR(191) NOT NULL,
    `pembelian_id` VARCHAR(191) NOT NULL,
    `obat_id` VARCHAR(191) NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `total` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_faktur_id_fkey` FOREIGN KEY (`faktur_id`) REFERENCES `penjualan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_obat_id_fkey` FOREIGN KEY (`obat_id`) REFERENCES `obat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pembelian_item` ADD CONSTRAINT `pembelian_item_pembelian_id_fkey` FOREIGN KEY (`pembelian_id`) REFERENCES `pembelian`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pembelian_item` ADD CONSTRAINT `pembelian_item_obat_id_fkey` FOREIGN KEY (`obat_id`) REFERENCES `obat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
