const app = require("../app")
const request = require("supertest")
const {
    addHousingRequestNotCompliant,
    addHousingRequestCompliant,
} = require("./housing.test.data")
//! Récupérer le token de validation en dehors des tests avant d'effectuer **npm test**
//! L'insérer entre les "" de la variable token :
const token = ""
// Controllers GET :
describe("GET /api/housing", () => {
    it("should return all housings", async () => {
        return request(app)
            .get("/api/housing")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200)
            })
    })
    //Id : Appartement cosy
    it("should return one housing by id", async () => {
        return request(app)
            .get("/api/housing/65d34370c9d75455d69c8784")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200)
            })
    })
})

//Controllers POST :
describe("POST /api/housing", () => {
    // Accès refusé
    it("should return unauthorized", async () => {
        return request(app)
            .post("/api/housing")
            .set(
                "Authorization",
                "Bearer xfiucnvigci,botvjhi681rg8svd289hvb79j#e;slidj"
            )
            .expect(401)
            .then((res) => {
                expect(res.statusCode).toBe(401)
            })
    })
    // Demande validée
    it("should return 201", async () => {
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(addHousingRequestCompliant)
            .expect(201)
            .then(({ body }) => {
                housingId = body._id
                // console.log(housingId)
            })
    })
    //? Titre invalide
    //*Titre vide
    it("should return empty title invalid ", async () => {
        const modifiedResquest = { ...addHousingRequestCompliant }
        modifiedResquest.title = addHousingRequestNotCompliant.emptyTitle
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedResquest)
            .expect(400)
            .then((res) => {
                response = JSON.parse(res.text)
                message = response.errors[0].msg
                expect(message).toEqual("Le titre est obligatoire")
            })
    })
    it("should return type number title invalid ", async () => {
        const modifiedResquest = { ...addHousingRequestCompliant }
        modifiedResquest.title = addHousingRequestNotCompliant.numberTitle
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedResquest)
            .expect(400)
            .then((res) => {
                response = JSON.parse(res.text)
                message = response.errors[0].msg
                expect(message).toEqual(
                    "Le titre doit être une chaîne de caractères"
                )
            })
    })
    it("should return title invalid, string too long", async () => {
        const modifiedResquest = { ...addHousingRequestCompliant }
        modifiedResquest.title = addHousingRequestNotCompliant.lengthTitle
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedResquest)
            .expect(400)
            .then((res) => {
                response = JSON.parse(res.text)
                message = response.errors[0].msg
                expect(message).toEqual(
                    "Le titre ne doit pas dépasser 100 caractères"
                )
            })
    })
    //? Cover invalide
    it("should return empty cover invalide", async () => {
        const modifiedResquest = { ...addHousingRequestCompliant }
        modifiedResquest.cover = addHousingRequestNotCompliant.emptyCover
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedResquest)
            .expect(400)
            .then((res) => {
                response = JSON.parse(res.text)
                message = response.errors[0].msg
                expect(message).toEqual("La couverture est obligatoire")
            })
    })
    it("should return type number cover invalide", async () => {
        const modifiedResquest = { ...addHousingRequestCompliant }
        modifiedResquest.cover = addHousingRequestNotCompliant.numberCover
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedResquest)
            .expect(400)
            .then((res) => {
                response = JSON.parse(res.text)
                message = response.errors[0].msg
                expect(message).toEqual(
                    "La couverture doit être une chaîne de caractères"
                )
            })
    })
    //? Pictures invalide
    it("should return pictures invalid", async () => {
        const modifiedResquest = { ...addHousingRequestCompliant }
        modifiedResquest.pictures =
            addHousingRequestNotCompliant.notArrayPictures
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedResquest)
            .expect(400)
            .then((res) => {
                response = JSON.parse(res.text)
                message = response.errors[0].msg
                expect(message).toEqual("Les images doivent être un tableau")
            })
    })
    //? Description invalide
    it("should return empty description invalid", async () => {
        const modifiedResquest = { ...addHousingRequestCompliant }
        modifiedResquest.description =
            addHousingRequestNotCompliant.emptyDescription
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedResquest)
            .expect(400)
            .then((res) => {
                response = JSON.parse(res.text)
                message = response.errors[0].msg
                expect(message).toEqual("La description est obligatoire")
            })
    })
    it("should return empty description invalid", async () => {
        const modifiedResquest = { ...addHousingRequestCompliant }
        modifiedResquest.description =
            addHousingRequestNotCompliant.numberDescription
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedResquest)
            .expect(400)
            .then((res) => {
                response = JSON.parse(res.text)
                message = response.errors[0].msg
                expect(message).toEqual(
                    "La description doit être une chaîne de caractères"
                )
            })
    })
    it("should return description invalid, string too long", async () => {
        const modifiedResquest = { ...addHousingRequestCompliant }
        modifiedResquest.description =
            addHousingRequestNotCompliant.lengthDescription
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedResquest)
            .expect(400)
            .then((res) => {
                response = JSON.parse(res.text)
                message = response.errors[0].msg
                expect(message).toEqual(
                    "La description ne doit pas dépasser 500 caractères"
                )
            })
    })
    //? Location invalide
    it("should return type number location invalid", async () => {
        const modifiedResquest = { ...addHousingRequestCompliant }
        modifiedResquest.location = addHousingRequestNotCompliant.numberLocation
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedResquest)
            .expect(400)
            .then((res) => {
                response = JSON.parse(res.text)
                message = response.errors[0].msg
                expect(message).toEqual(
                    "La localisation doit être une chaîne de caractères"
                )
            })
    })
    it("should return location invalid, string too long", async () => {
        const modifiedResquest = { ...addHousingRequestCompliant }
        modifiedResquest.location = addHousingRequestNotCompliant.lengthLocation
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedResquest)
            .expect(400)
            .then((res) => {
                response = JSON.parse(res.text)
                message = response.errors[0].msg
                expect(message).toEqual(
                    "La localisation ne doit pas dépasser 100 caractères"
                )
            })
    })
    //? Host name invalide
    it("should return empty host name invalid", async () => {
        const modifiedResquest = { ...addHousingRequestCompliant }
        modifiedResquest.host.name = addHousingRequestNotCompliant.emptyHostName
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedResquest)
            .expect(400)
            .then((res) => {
                response = JSON.parse(res.text)
                message = response.errors[0].msg
                expect(message).toEqual("Le nom de l'hôte est obligatoire")
            })
    })
    it("should return type number host name invalid", async () => {
        const modifiedResquest = { ...addHousingRequestCompliant }
        modifiedResquest.host.name =
            addHousingRequestNotCompliant.numberHostName
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedResquest)
            .expect(400)
            .then((res) => {
                response = JSON.parse(res.text)
                message = response.errors[0].msg
                expect(message).toEqual(
                    "Le nom de l'hôte doit être une chaîne de caractères"
                )
            })
    })
    it("should return host name invalid, string too long", async () => {
        const modifiedResquest = { ...addHousingRequestCompliant }
        modifiedResquest.host.name =
            addHousingRequestNotCompliant.lengthHostName
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedResquest)
            .expect(400)
            .then((res) => {
                response = JSON.parse(res.text)
                message = response.errors[0].msg
                expect(message).toEqual(
                    "Le nom de l'hôte ne doit pas dépasser 50 caractères"
                )
            })
    })
    //? Host picture invalid
    it("should return empty host picture invalid", async () => {
        const modifiedResquest = { ...addHousingRequestCompliant }
        modifiedResquest.host.picture =
            addHousingRequestNotCompliant.emptyHostPicture
        //! Pour plus tard trouver pouqruoi host.name est modifié
        modifiedResquest.host.name = "Nathalie Jean"
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedResquest)
            .expect(400)
            .then((res) => {
                response = JSON.parse(res.text)
                message = response.errors[0].msg
                expect(message).toEqual("L'image de l'hôte est obligatoire")
            })
    })
    it("should return empty host picture invalid", async () => {
        const modifiedResquest = { ...addHousingRequestCompliant }
        modifiedResquest.host.picture =
            addHousingRequestNotCompliant.numberHostPicture
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedResquest)
            .expect(400)
            .then((res) => {
                response = JSON.parse(res.text)
                message = response.errors[0].msg
                expect(message).toEqual(
                    "L'image doit être une chaîne de caractères"
                )
            })
    })
    //? Rating string invalide
    it("should return string rating invalid", async () => {
        const modifiedResquest = { ...addHousingRequestCompliant }
        modifiedResquest.rating = addHousingRequestNotCompliant.stringRating
        //! Pour plus tard trouver pourquoi host.picture est modifié
        modifiedResquest.host.picture =
            "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-12.jpg"
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedResquest)
            .expect(400)
            .then((res) => {
                response = JSON.parse(res.text)
                message = response.errors[0].msg
                expect(message).toEqual(
                    "La note doit être comprise entre 0 et 5"
                )
            })
    })
    it("should return lower rating invalid", async () => {
        const modifiedResquest = { ...addHousingRequestCompliant }
        modifiedResquest.rating = addHousingRequestNotCompliant.lowerRating
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedResquest)
            .expect(400)
            .then((res) => {
                response = JSON.parse(res.text)
                message = response.errors[0].msg
                expect(message).toEqual(
                    "La note doit être comprise entre 0 et 5"
                )
            })
    })
    it("should return higther rating invalid", async () => {
        const modifiedResquest = { ...addHousingRequestCompliant }
        modifiedResquest.rating = addHousingRequestNotCompliant.higherRating
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedResquest)
            .expect(400)
            .then((res) => {
                response = JSON.parse(res.text)
                message = response.errors[0].msg
                expect(message).toEqual(
                    "La note doit être comprise entre 0 et 5"
                )
            })
    })
    it("should return type object equipement invalid", async () => {
        const modifiedResquest = { ...addHousingRequestCompliant }
        modifiedResquest.equipments =
            addHousingRequestNotCompliant.notArrayEquipment
        modifiedResquest.rating = 5
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedResquest)
            .expect(400)
            .then((res) => {
                response = JSON.parse(res.text)
                message = response.errors[0].msg
                expect(message).toEqual(
                    "Les équipements doivent être un tableau"
                )
            })
    })
    it("should return type object tags invalid", async () => {
        const modifiedResquest = { ...addHousingRequestCompliant }
        modifiedResquest.tags = addHousingRequestNotCompliant.notArrayTags
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedResquest)
            .expect(400)
            .then((res) => {
                response = JSON.parse(res.text)
                message = response.errors[0].msg
                expect(message).toEqual("Les tags doivent être un tableau")
            })
    })
})

//Controllers PUT :
describe("PUT /api/housing/", () => {
    // Accès refusé
    it("should return unauthorized", async () => {
        return request(app)
            .put(`/api/housing/${housingId}`)
            .set("Authorization", "hvhbfgnjilwq5442")
            .expect(401)
            .then((res) => {
                expect(res.statusCode).toBe(401)
            })
    })
    // Demande validée
    it("should return 201", async () => {
        return request(app)
            .post("/api/housing")
            .set("Authorization", `Bearer ${token}`)
            .send(addHousingRequestCompliant)
            .expect(201)
    })
})
//Controllers DELETE
describe("DELETE /api/housing/:id", () => {
    // Accés refusé
    it("should return unauthorized", async () => {
        return request(app)
            .delete(`/api/housing/tdchfygjhnyujk622688262888`)
            .set("Authorization", "hvhbfgnjilwq5442")
            .expect(401)
            .then((res) => {
                expect(res.statusCode).toBe(401)
            })
    })
    //Demande validée
    it("should return 200", async () => {
        return request(app)
            .delete(`/api/housing/${housingId}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
    })
})
