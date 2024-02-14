//? Import du paquet
const mongoose = require("mongoose")

const housingSchema = mongoose.Schema({
    title: { type: String, required: true },
    cover: { type: String, required: true },
    pictures: { type: [String], required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    host: {
        name: { type: String, required: true },
        picture: { type: String, required: true },
    },
    rating: { type: Number, required: true },
    equipments: { type: [String], required: true },
    tags: { type: [String], required: true },
})

module.exports = mongoose.model("Housing", housingSchema)
