const express = require("express");
const router = express.Router();
const { register, login, userProfile } = require("../controllers/auth-controller")
const { authCheck } = require('../middleware/auth')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/userProfile').get(authCheck, userProfile)

module.exports = router;