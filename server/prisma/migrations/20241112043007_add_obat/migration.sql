-- CreateTable
CREATE TABLE `kategori` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `kategori_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `satuan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `satuan_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `obat` (
    `kode` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `harga_beli` DOUBLE NOT NULL,
    `harga_jual` DOUBLE NOT NULL,
    `laba` DOUBLE NOT NULL,
    `stock` INTEGER NOT NULL,
    `expired` DATETIME(3) NOT NULL,
    `kategori_id` INTEGER NOT NULL,
    `satuan_id` INTEGER NOT NULL,
    `suplier` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`kode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `obat` ADD CONSTRAINT `obat_kategori_id_fkey` FOREIGN KEY (`kategori_id`) REFERENCES `kategori`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `obat` ADD CONSTRAINT `obat_satuan_id_fkey` FOREIGN KEY (`satuan_id`) REFERENCES `satuan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
