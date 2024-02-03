//? Import du paquet
const mongoose = require("mongoose")

const aboutSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
})

module.exports = mongoose.model("About", aboutSchema)

