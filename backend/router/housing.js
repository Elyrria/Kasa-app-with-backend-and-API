//? Import des paquets + modules
const express = require("express")
const housingCtrl = require("../controllers/housing")
const auth = require("../middlewares/auth")
const router = express.Router()

//* Routes pour la partie hébérgement

router.post("/", auth, housingCtrl.creatHousing)

router.put("/:id", auth, housingCtrl.modifyHousing)

router.delete("/:id", auth, housingCtrl.deleteHousing)

router.get("/:id", housingCtrl.getOneHousing)

router.get("/", housingCtrl.getAllHousings)

module.exports = router
