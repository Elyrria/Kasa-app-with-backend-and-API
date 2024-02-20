const express = require("express")
const router = express.Router()
const aboutCtrl = require("../controllers/about")
const aboutValidationRules = require("../validators/aboutValidation")
const { validationResult } = require("express-validator")

router.get("/", aboutCtrl.getAllAbout)
router.post("/", aboutValidationRules, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    //Si pas d'erreur de validation
    aboutCtrl.creatAbout(req, res)
})

module.exports = router
