const prisma = require('../../../prisma/prismaClient');
const bcrypt = require('bcrypt');

exports.SignIn = async (req, res) => {
    const {email, password} = req.body;

    if (!email && !password) {
        return res.status(403).send("email and password required")
    }

    try {
        const user = await prisma.user.findUnique({
            where : {
                email : email,
            }
        })

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send("password incorrect");
        }

        res.status(200).send("Login successful")
    } catch (error) {
        console.error("Error occurred during admin signup:", error);
        return res.status(500).send(error)
    }
}

exports.SignUp = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send("All fields are required");
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return res.status(400).send("Email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const data = await prisma.user.create({
            data : {
                name : name,
                password : hashedPassword,
                email : email,
            }
        })

        res.status(200).send("Succes")
    } catch (error) {
        console.error("Error occurred during admin signup:", error);
        return res.status(500).send(error)
    }
}