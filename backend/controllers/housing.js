//? Import du module du schema de Housing
const Housing = require("../models/Housing")
//* Export des fonctions de logique métier pour les routes
exports.creatHousing = (req, res, next) => {
    const housingObject = req.body
    delete housingObject.userId //! Suppression du userId pour des raisons de sécurité
    const housing = new Housing({
        ...housingObject,
        userId: req.auth.userId,
    })
    housing
        .save()
        .then(() => {
            res.status(201).json(housing)
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

exports.modifyHousing = (req, res, next) => {
    const housingObject = req.body
    delete housingObject.userId //! Suppression du userId pour des raisons de sécurité
    Housing.findOne({ _id: req.params.id })
        .then((housing) => {
            if (!housing) {
                return res.status(404).json({
                    message: "Hébergement introuvable",
                })
            }
            if (housing.userId !== req.auth.userId) {
                return res.status(401).json({
                    message: "Accès refusés",
                })
            } else {
                Housing.updateOne(
                    { _id: req.params.id },
                    { ...housingObject, _id: req.params.id }
                )
                    .then(() =>
                        res
                            .status(200)
                            .json({ message: "Hébergement modifié !" })
                    )
                    .catch((error) => {
                        res.status(500).json({ error })
                    })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(400).json({ error })
        })
}

exports.deleteHousing = (req, res, next) => {
    Housing.findOne({ _id: req.params.id })
        .then((housing) => {
            if (housing.userId !== req.auth.userId) {
                return res.status(401).json({
                    message: "Accès refusé !!!",
                })
            } else {
                Housing.deleteOne({ _id: req.params.id })
                    .then(() => {
                        res.status(200).json({
                            message: "Hébergement supprimé !",
                        })
                    })
                    .catch((error) => {
                        console.log("la")
                        res.status(500).json({ error })
                    })
            }
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

exports.getOneHousing = (req, res, next) => {
    Housing.findOne({ _id: req.params.id })
        .then((housing) => res.status(200).json({ housing }))
        .catch((error) => res.status(400).json({ error }))
}

exports.getAllHousings = (req, res, next) => {
    Housing.find()
        .then((housings) => res.status(200).json({ housings }))
        .catch((error) => res.status(400).json({ error }))
}
