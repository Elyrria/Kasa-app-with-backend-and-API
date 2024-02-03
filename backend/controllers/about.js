const About = require("../models/About")

exports.getAllAbout = (req, res, next) => {
    About.find()
        .then((abouts) => {
            res.status(200).json({ abouts })
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

exports.creatAbout = (req, res, next) => {
    const about = new About({
        ...req.body,
    })
    about
        .save()
        .then((about) => res.status(201).json({ about }))
        .catch((error) => res.status(400).json({ error }))
}
