const prisma = require('../../../prisma/prismaClient');

exports.CreateKategori = async (req, res) => {
    const {name} = req.body;

    try {
        const kategory = await prisma.kategori.findUnique({
            where : {
                name : name
            }
        })

        if (kategory) {
            return res.status(400).send("Name Already Exists");
        }

        const data = await prisma.kategori.create({
            data : {
                name : name
            }
        })

        res.status(200).send("Succes")
    } catch (error) {
        console.error("Error add kategory", error);
        return res.status(500).send(error)
    }
}

exports.GetAllKategori = async (req, res) => {
    try {
        const kategori = await prisma.kategori.findMany();

        res.status(200).send(kategori)
    } catch (error) {
        console.error("Error add satuan", error);
        return res.status(500).send(error)
    }
}

exports.GetKategoriById = async (req, res) => {
    const {id} = req.params;

    try {
        const kategori = await prisma.kategori.findMany({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).send(kategori)
    } catch (error) {
        console.error("Error add satuan", error);
        return res.status(500).send(error)
    }
}

exports.UpdateKategori = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    // Validasi awal jika `name` kosong
    if (!name) {
        return res.status(400).send("Nama kategori tidak boleh kosong.");
    }
    
    try {
        // Periksa apakah kategori dengan id yang diberikan ada
        const kategori = await prisma.kategori.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!kategori) {
            return res.status(400).send("Id tidak terdaftar");
        }

        // Periksa apakah `name` berbeda dari yang sudah ada
        if (kategori.name === name) {
            return res.status(402).send("Nama kategori sudah sesuai, tidak ada perubahan.");
        }

        // Jika nama unik, lanjutkan update
        const updateKategori = await prisma.kategori.update({
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

exports.DeleteKategori = async (req, res) => {
    const { id } = req.params;

    try {
        const kategori = await prisma.kategori.delete({
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
