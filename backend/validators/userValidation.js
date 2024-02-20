// Import de l'objet body depuis express-validator
const { body } = require("express-validator")
// Règles de validation pour la connexion de l'utilisateur
const loginUserValidationRules = [
    // L'email : eamil, obligatoire, échapper les caractères spéciaux
    body("email")
        .isEmail()
        .withMessage("L'email doit être une adresse email valide")
        .escape(),
    // Le mot de passe : chaîne de caractères , obligatoire, échapper les caractères spéciaux
    body("password")
        .isString()
        .isLength({ min: 6 })
        .withMessage("Le mot de passe doit contenir au moins 6 caractères")
        .escape(),
]

module.exports = loginUserValidationRules
