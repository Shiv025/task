const userModel = require('../models/userSchema')
const JWT = require('jsonwebtoken')



const register = async (req, res) => {
    try {

        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).send({ status: false, message: "All fields are mandatory (i.e. name, email, phone, password)" })
        }

        const checkUser = await userModel.findOne({ $or: [{ email: email }, { phone: phone }] });

        if (checkUser) {
            if (checkUser.email === email) return res.status(400).send({ status: false, message: "Email already exist" })
            if (checkUser.phone === phone) return res.status(400).send({ status: false, message: "Phone number already exist" })
        }

        await userModel.create({ name: name, email: email, phone: phone, password: password })

        res.status(201).send({ status: true, message: "User registation successfully" })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}




const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ status: false, message: "All fields are mandatory (i.e. email, password)" })
        }

        const checkUser = await userModel.findOne({ email: email });

        if (!checkUser) {
            return res.status(404).send({ status: false, message: "User is not exist" })
        }

        if (checkUser.password !== password) return res.status(400).send({ status: false, message: "Wrong password" })

        const payload = {
            userId: checkUser.id.toString(),
            name: checkUser.name,
            email: checkUser.email
        }

        const token = JWT.sign(payload, 'Shivani-Auth-System', {expiresIn : '24h'})

        res.status(200).send({ status: true, message: "Login successfully", data: token })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}



const userProfile = async (req, res) => {
    try {

        const checkUser = await userModel.findById(req.token.userId);

        if (!checkUser) {
            return res.status(404).send({ status: false, message: "User is not exist" })
        }

        res.status(200).send({ status: true, message: "Data fetched successfully", data: checkUser })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}




module.exports = { register, login, userProfile }