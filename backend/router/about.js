const express = require("express")
const router = express.Router()
const aboutCtrl = require("../controllers/about")

router.get("/", aboutCtrl.getAllAbout)
router.post("/", aboutCtrl.creatAbout)

module.exports = router
