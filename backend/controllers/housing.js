//? Import du module du schema de Housing
const Housing = require("../models/Housing")
//* Export des fonctions de logique métier pour les routes
exports.creatHousing = (req, res, next) => {
    const housingObject = req.body
    delete housingObject._id
    delete housingObject.userId

    const housing = new Housing({
        ...housingObject,
        userId: req.auth.userId,
    })
    housing
        .save()
        .then(() => {
            res.status(201).json({ message: "Objet créé !", objet: req.body })
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

exports.modifyHousing = (req, res, next) => {
    Housing.updateOne(
        { _id: req.params.id },
        { ...req.body, _id: req.params.id }
    )
        .then(() => res.status(200).json({ message: "Modified!" }))
        .catch((error) => res.status(400).json({ error }))
}

exports.deleteHousing = (req, res, next) => {
    Housing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Deleted!" }))
        .catch((error) => res.status(400).json({ error }))
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
