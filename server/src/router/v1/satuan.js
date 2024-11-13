const prisma = require('../../../prisma/prismaClient');

exports.CreateSatuan = async (req, res) => {
    const { name } = req.body;

    try {
        const satuan = await prisma.satuan.findUnique({
            where : {
                name : name
            }
        })

        if (satuan) {
            return res.status(400).send("Name Already Exists");
        }

        const data = await prisma.satuan.create({
            data : {
                name : name
            }
        })

        res.status(200).send("Succes")
    } catch (error) {
        console.error("Error add satuan", error);
        return res.status(500).send(error)
    }
}

exports.GetSatuanById = async (req, res) => {
    const {id} = req.params;

    try {
        const satuan = await prisma.satuan.findMany({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).send(satuan)
    } catch (error) {
        console.error("Error add satuan", error);
        return res.status(500).send(error)
    }
}

exports.UpdateSatuan = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    // Validasi awal jika `name` kosong
    if (!name) {
        return res.status(400).send("Nama Satuan tidak boleh kosong.");
    }
    
    try {
        // Periksa apakah kategori dengan id yang diberikan ada
        const satuan = await prisma.satuan.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!satuan) {
            return res.status(400).send("Id tidak terdaftar");
        }

        // Periksa apakah `name` berbeda dari yang sudah ada
        if (satuan.name === name) {
            return res.status(402).send("Nama kategori sudah sesuai, tidak ada perubahan.");
        }

        // Jika nama unik, lanjutkan update
        const updateSatuan = await prisma.satuan.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: name
            }
        });

        return res.status(200).send("Success");
    } catch (error) {
        console.error("Error update kategori", error);
        return res.status(500).send(error);
    }
};

exports.GetAllSatuan= async (req, res) => {
    try {
        const satuan = await prisma.satuan.findMany();

        res.status(200).send(satuan)
    } catch (error) {
        console.error("Error add satuan", error);
        return res.status(500).send(error)
    }
}

exports.DeleteSatuan = async (req, res) => {
    const { id } = req.params;

    try {
        const satuan = await prisma.satuan.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).send("Succcess")
    } catch (error) {
        console.error("Error", error);
        return res.status(500).send(error)
    }
}