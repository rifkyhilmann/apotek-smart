const prisma = require('../../../prisma/prismaClient');

exports.CreatePenjualan = async (req, res) => {
    const { faktur, tanggal, waktu, pembayaran, total, total_laba } = req.body

    try {
        const checkFaktur = await prisma.penjualan.findUnique({
            where : {
                faktur : faktur
            }
        })

        if(checkFaktur) {
            return res.status(4002).send("Faktur is already")
        }

        const penjualan = await prisma.penjualan.create({
            data : {
                faktur : faktur,
                tanggal : tanggal,
                waktu : waktu,
                pembayaran : pembayaran,
                total : total,
                total_laba : total_laba,
            }
        })

        res.status(200).send("success")
    } catch (error) {
        console.error("Error add penjualan", error);
        return res.status(500).send(error)
    }
}

exports.CreateOrderPenjualan = async (req, res) => {
    const { faktur_id, obat_id, jumlah, total_laba, total } = req.body;

    try {
        const order = await prisma.orderItems.create({
            data : {
                faktur_id : faktur_id,
                obat_id : obat_id,
                jumlah : jumlah,
                total_laba : total_laba,
                total : total
            }
        })

        res.status(200).send("success")
    } catch (error) {
        console.error("Error add penjualan", error);
        return res.status(500).send(error)
    }
}