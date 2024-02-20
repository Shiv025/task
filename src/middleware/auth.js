const userModel = require('../models/userSchema')
const JWT = require('jsonwebtoken')


const authCheck = async (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1];

        JWT.verify(token, 'Shivani-Auth-System', (error, decodedToken) => {
            if (error) return res.status(401).send({ status: false, message: "You are not authorize!" })

            else {
                req.token = decodedToken
                next();
            }
        })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { authCheck }