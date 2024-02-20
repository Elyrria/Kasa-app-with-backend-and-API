// Import de l'objet body depuis express-validator
const { body } = require("express-validator")
// Règles de validation pour l'ajout d'un about
const aboutValidationRules = [
    // Titre : chaîne de caractères, obligatoire, échapper les caractères spéciaux
    body("name")
        .isString()
        .escape()
        .isLength({ max: 50 })
        .withMessage("Le titre ne doit pas dépasser 100 caractères")
        .notEmpty()
        .withMessage("Le titre est obligatoire"),
    // Description : chaîne de caractères, obligatoire, échapper les caractères spéciaux
    body("description")
        .isString()
        .escape()
        .isLength({ max: 1000 })
        .withMessage("Le titre ne doit pas dépasser 1000 caractères")
        .notEmpty()
        .withMessage("Le titre est obligatoire"),
]

module.exports = aboutValidationRules
