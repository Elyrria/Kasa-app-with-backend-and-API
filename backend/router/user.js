const express = require("express")
const router = express.Router()
const userCtrl = require("../controllers/user")
const loginUserValidationRules = require("../validators/userValidation")
const { validationResult } = require("express-validator")

router.post("/login", loginUserValidationRules, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    //Si pas d'erreur de validation
    userCtrl.login(req, res)
})
router.post("/signup", userCtrl.signup)

module.exports = router
