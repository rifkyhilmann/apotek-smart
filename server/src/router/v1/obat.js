const prisma = require('../../../prisma/prismaClient');

exports.CreateObat = async (req, res) => {
    const {kode, nama, harga_beli, harga_jual, stock, expired, kategori_id, satuan_id, suplier} = req.body;

    try {
        const existingObat = await prisma.obat.findUnique({
            where: { kode }
        });

        if (existingObat) {
            return res.status(400).json({ message: 'Kode obat sudah terdaftar, gunakan kode yang lain' });
        }

        const jumlahLaba = harga_jual - harga_beli;
        const expiredDate = "2024-11-14" + "T00:00:00.000Z";

        const newObat = await prisma.obat.create({
            data: {
                kode,
                nama: nama,
                harga_beli: parseFloat(harga_beli),
                harga_jual: parseFloat(harga_jual),
                laba : parseFloat(jumlahLaba),
                stock,
                expired : expiredDate,
                kategori_id : parseInt(kategori_id),
                satuan_id : parseInt(satuan_id),
                suplier // Jika suplier adalah relasi, pastikan sudah sesuai dengan model
            }
        });

        if(!newObat) {
            return res.status(402).send("Gagal Membuat")
        }

        res.status(200).send("Success add obat")

    } catch (error) {
        console.error("Error add Obat", error);
        return res.status(500).send(error)
    }
}

exports.GetAllObat = async (req, res) => {
    try {
        const obat = await prisma.obat.findMany({
            orderBy: {
                expired: 'desc', // Mengurutkan berdasarkan kolom expired, 'desc' berarti descending (terbaru dulu)
            },
            select : {
                id : true,
                kode : true,
                nama : true,
                harga_beli : true,
                harga_jual : true,
                laba : true,
                stock : true,
                expired : true,
                kategori_id : true,
                kategori : {
                    select : {
                        name : true,
                    }
                },
                satuan_id : true,
                satuan : {
                    select : {
                        name : true,
                    }
                },
                suplier : true
            }
        })

        const data = obat.map(items => ({
            ...items,
            kategori : items.kategori?.name || 'Tidak ada',
            satuan : items.satuan?.name || 'Tidak ada',
            expired: items.expired ? new Date(items.expired).toLocaleDateString('id-ID') : 'Tidak ada',
        }))

        res.status(200).send(data)
    } catch (error) {
        console.error("Error add Obat", error);
        return res.status(500).send(error)
    }
}

exports.DeleteObat = async (req, res) => {
    const { id } = req.params;

    try {
        const obat = await prisma.obat.delete({
            where : {
                id : id
            }
        })

        res.status(200).send("Succcess")
    } catch (error) {
        console.error("Error", error);
        return res.status(500).send(error)
    }
}

exports.GetObatByid = async (req, res) => {
    const { id } = req.params;

    try {
        const obat = await prisma.obat.findUnique({
            where : {
                id : id
            },
        })

        if (!obat) {
            return res.status(404).send("Obat not found")
        }

        const data = {
            ...obat,
            expired: obat.expired ? new Date(obat.expired).toISOString().split('T')[0] : '', // Format menjadi yyyy-mm-dd
        }

        res.status(200).send(data)
    } catch (error) {
        console.error("Error", error);
        return res.status(500).send(error)
    }
}


exports.UpdateObat = async (req, res) => {
    const { id } = req.params;  // Ambil id obat dari URL
    const { kode, nama, harga_beli, harga_jual, stock, expired, kategori_id, satuan_id, suplier } = req.body;

    try {
        // Cek apakah obat dengan ID yang diberikan ada
        const obat = await prisma.obat.findUnique({
            where: { id }
        });

        if (!obat) {
            return res.status(404).json({ message: 'Obat tidak ditemukan' });
        }

        // Cek jika kode obat yang baru sudah ada
        if (kode !== obat.kode) {
            const existingObat = await prisma.obat.findUnique({
                where: { kode }
            });

            if (existingObat) {
                return res.status(400).json({ message: 'Kode obat sudah terdaftar, gunakan kode yang lain' });
            }
        }

        // Menghitung laba baru
        const jumlahLaba = harga_jual - harga_beli;

        // Jika expired diupdate, ubah formatnya menjadi ISO
        const expiredDate = expired ? new Date(expired).toISOString() : obat.expired;

        // Update data obat
        const updatedObat = await prisma.obat.update({
            where: { id },
            data: {
                kode,
                nama,
                harga_beli: parseFloat(harga_beli),
                harga_jual: parseFloat(harga_jual),
                laba: parseFloat(jumlahLaba),
                stock,
                expired: expiredDate,
                kategori_id: parseInt(kategori_id),
                satuan_id: parseInt(satuan_id),
                suplier // Jika suplier adalah relasi, pastikan sudah sesuai dengan model
            }
        });

        // Cek apakah update berhasil
        if (!updatedObat) {
            return res.status(402).send("Gagal Mengupdate obat");
        }

        res.status(200).send("Obat berhasil diupdate");
    } catch (error) {
        console.error("Error update Obat", error);
        return res.status(500).send(error);
    }
};
