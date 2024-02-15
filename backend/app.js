//? Import des paquets + modules
const express = require("express")
const mongoose = require("mongoose")
const swaggerUi = require("swagger-ui-express")
const yaml = require("yamljs")
const swaggerDocs = yaml.load("swagger.yaml")
const housingRoutes = require("./router/housing")
const aboutRoutes = require("./router/about")
const userRoutes = require("./router/user")

require("dotenv").config() // Permet de charger les variables d'environnement

const app = express() // Conversion du module app en une application express

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGODB_USER_SECRET}:${process.env.MONGODB_PASSWORD_SECRET}@housings.ibzmhip.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => console.log("Connexion à MongoDB réussie ✅"))
    .catch(() => console.log("Connexion à MongoDB échouée ❌"))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*") // Permet d'accéder à l'API depuis n'importe quelle origine
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, userid"
    ) // Permet d'ajouter tous les en-têtes mentionnés aux requêtes vers l'API
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    ) // Permet d'envoyer des requêtes avec les méthodes mentionnées
    next()
})

app.use(express.json()) // Permet de récupérer le corps de la requête (req) au format JSON et de l'envoyer comme réponse (res)

app.use("/api/housing", housingRoutes) // Utilisation des routes housingRoutes pour le début de route "/api/housing"
app.use("/api/about", aboutRoutes) // Utilisation des routes aboutRoutes pour le début de route "/api/about"
app.use("/api/auth", userRoutes) // Utilisation des routes userRoutes pour le début de route "/api/auth"
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)) //! => Routes vers la documentation de l'API

module.exports = app
