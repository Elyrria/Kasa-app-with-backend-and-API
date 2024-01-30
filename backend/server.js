const http = require("http")
const app = require("./app")

// Fonction qui permet de renvoyer un port de type Number
const normalizePort = (val) => {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
        return val
    }
    if (port >= 0) {
        return port
    }
    return false
}

const port = normalizePort(process.env.PORT || "3001")
// On passe à l'application le port utilisé
app.set("port", port)

// Fonction qui assure la gestion d'erreur pour le démarrage du serveur
const errorHandler = (error) => {
    if (error.syscall !== "listen") {
        throw error
    }
    const address = server.address() // Correction : Utilisez 'address' au lieu de 'adress'
    const bind =
        typeof address === "string" ? `pipe ${address}` : `port : ${port}`

    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges.")
            process.exit(1)
            break
        case "EADDRINUSE":
            console.error(bind + " is already in use.")
            process.exit(1)
            break
        default:
            throw error
    }
}

// Création du serveur
const server = http.createServer(app)

// Écoute du serveur
server.on("error", errorHandler)
server.on("listening", () => {
    const address = server.address()
    const bind =
        typeof address === "string" ? "pipe " + address : "port " + port
    console.log("Listening on " + bind)
})

server.listen(port)
