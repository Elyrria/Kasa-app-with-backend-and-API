//? Import des paquets + modules
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const housingRoutes = require("./router/housing")
const aboutRoutes = require("./router/about")

const app = express()

mongoose
    .connect(
        "mongodb+srv://Quentin:mA5RJdiHeTnmNw6R@housings.ibzmhip.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"))

// Middaleware qui permet d'autoriser toutes les requêtes en ajoutant des en-tête
app.use((req, res, next) => {
    // Donner accès à toute le monde (*)
    res.setHeader("Access-Control-Allow-Origin", "*")
    // Donner l'autroisation d'utiliser certains headers
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    )
    // Donner l'accès à certaines méthodes
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    )
    next()
})

// Utilisation du middlware bodyParser => transforme les datas brutes en un objet JS via => req.body
app.use(bodyParser.json())
// Utilisation des routes housingRoutes pour le début de route "/api/housing"
app.use("/api/housing", housingRoutes)
app.use("/api/about", aboutRoutes)

module.exports = app
