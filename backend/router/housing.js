//? Import des paquets + modules
const express = require("express")
const router = express.Router()
const housingCtrl = require("../controllers/housing")
const auth = require("../middlewares/auth")
const housingValidationRules = require("../validators/housingValidation")
const { validationResult } = require("express-validator")

//* Routes pour la partie hébérgement
router.post("/", auth, housingValidationRules, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    //Si pas d'erreur de validation
    housingCtrl.creatHousing(req, res)
})

router.put("/:id", auth, housingValidationRules, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    //Si pas d'erreur de validation
    housingCtrl.modifyHousing(req, res)
})

router.delete("/:id", auth, housingCtrl.deleteHousing)

router.get("/:id", housingCtrl.getOneHousing)

router.get("/", housingCtrl.getAllHousings)

module.exports = router
