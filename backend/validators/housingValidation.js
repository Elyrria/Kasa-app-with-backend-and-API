// Import de l'objet body depuis express-validator
const { body } = require("express-validator")
// Règles de validation pour la publication et la modification d'un hébérgement
const housingValidationRules = [
    // Titre : chaîne de caractères, obligatoire, échapper les caractères spéciaux
    body("title")
        .isString()
        .withMessage("Le titre doit être une chaîne de caractères")
        .escape()
        .isLength({ max: 100 })
        .withMessage("Le titre ne doit pas dépasser 100 caractères")
        .notEmpty()
        .withMessage("Le titre est obligatoire"),

    // Cover : chaîne de caractères, obligatoire, échapper les caractères spéciaux
    body("cover")
        .isString()
        .withMessage("La couverture doit être une chaîne de caractères")
        .notEmpty()
        .withMessage("La couverture est obligatoire"),

    // Pictures : tableau de chaînes de caractères, obligatoire
    body("pictures")
        .isArray()
        .withMessage("Les images doivent être un tableau")
        .notEmpty()
        .withMessage("Au moins une image est requise"),

    // Description : chaîne de caractères, obligatoire, échapper les caractères spéciaux
    body("description")
        .isString()
        .withMessage("La description doit être une chaîne de caractères")
        .escape()
        .isLength({ max: 500 })
        .withMessage("La description ne doit pas dépasser 500 caractères")
        .notEmpty()
        .withMessage("La description est obligatoire"),

    // Location : chaîne de caractères, obligatoire, échapper les caractères spéciaux
    body("location")
        .isString()
        .withMessage("La localisation doit être une chaîne de caractères")
        .escape()
        .isLength({ max: 100 })
        .withMessage("La localisation ne doit pas dépasser 100 caractères")
        .notEmpty()
        .withMessage("La localisation est obligatoire"),

    // Host : objet avec les champs 'name' et 'picture', chacun étant une chaîne de caractères, obligatoires, échapper les caractères spéciaux
    body("host.name")
        .isString()
        .withMessage("Le nom de l'hôte doit être une chaîne de caractères")
        .escape()
        .isLength({ max: 50 })
        .withMessage("Le nom de l'hôte ne doit pas dépasser 50 caractères")
        .notEmpty()
        .withMessage("Le nom de l'hôte est obligatoire"),
    body("host.picture")
        .isString()
        .withMessage("L'image doit être une chaîne de caractères")
        .escape()
        .notEmpty()
        .withMessage("L'image de l'hôte est obligatoire"),

    // Rating : nombre entier, obligatoire, doit être compris entre 0 et 5 inclus
    body("rating")
        .isNumeric()
        .withMessage("La note doit être un nombre")
        .escape()
        .isInt({ min: 1, max: 5 })
        .withMessage("La note doit être comprise entre 0 et 5"),

    // Equipments : tableau de chaînes de caractères, obligatoire
    body("equipments")
        .isArray()
        .withMessage("Les équipements doivent être un tableau")
        .notEmpty()
        .withMessage("Au moins un équipement est requis"),

    // Tags : tableau de chaînes de caractères, obligatoire
    body("tags")
        .isArray()
        .withMessage("Les tags doivent être un tableau")
        .notEmpty()
        .withMessage("Au moins un tag est requis"),
]

module.exports = housingValidationRules
