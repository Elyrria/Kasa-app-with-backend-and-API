//? Import des paquets
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const Housing = require("./models/housing")

mongoose
    .connect(
        "mongodb+srv://Quentin:mA5RJdiHeTnmNw6R@housings.ibzmhip.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"))

const app = express()

// Utilisation du middlware bodyParser => transforme les datas brutes en un objet JS via => req.body
app.use(bodyParser.json())

// Middaleware qui d'autoriser toutes les requêtes en rajoutant des en-tête
app.use((req, res, next) => {
    // Donner accès à toute le monde (*)
    res.setHeader("Access-Control-Allow-Origin", "*")
    // Donner l'autroisation d'utiliser certain header
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    )
    // Donner l'accès à certaines méthode
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    )
    next()
})

app.put("/api/housing/:id", (req, res, next) => {
    Housing.updateOne(
        { _id: req.params.id },
        { ...req.body, _id: req.params.id }
    )
        .then(() => res.status(200).json({ message: "Modified!" }))
        .catch((error) => res.status(400).json({ error }))
})
app.delete("/api/housing/:id", (req, res, next) => {
    Housing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Deleted!" }))
        .catch((error) => res.status(400).json({ error }))
})

app.post("/api/housing", (req, res, next) => {
    const housing = new Housing({
        ...req.body,
    })
    housing
        .save()
        .then((housing) => res.status(201).json({ housing }))
        .catch((error) => res.status(400).json({ error }))
})

app.get("/api/housing/:id", (req, res, next) => {
    Housing.findOne({ _id: req.params.id })
        .then((housing) => res.status(200).json({ housing }))
        .catch((error) => res.status(400).json({ error }))
})

app.get("/api/housing", (req, res, next) => {
    Housing.find()
        .then((housings) => res.status(200).json({ housings }))
        .catch((error) => res.status(400).json({ error }))
})

module.exports = app
