# Kasa App

## Comment lancer le projet ?

### Depuis le dossier frontend

#### Avec npm

Faites la commande `npm install` pour installer les dépendances puis `npm start` pour lancer le projet.

### Depuis le dossier backend

#### Avec npm

Faites la commande `npm install` pour installer les dépendances puis `nodemon` pour lancer le serveur.

Le projet a été testé sur node 19.

##### Lien pour voir

```
La documentation de l'API avec Swagger http://localhost:3001/api/docs/

Pour lire la documentation, utiliser Chrome ou Firefox
```

\*\*Pour valider la connexion :


*Adresse mail* : test@test.com
*Mot de passe* : testtest

# Kasa App

## Projet initial parcours Développeur Web Openclassrooms

Projet 6 Kasa Créez une application web de location immobilière avec React :

### Scénario :

Kasa ma recruté en tant que développeur front-end en freelance pour développer sa nouvelle plateforme web. Kasa est dans le métier de la location d’appartements entre particuliers depuis près de 10 ans maintenant. Avec plus de 500 annonces postées chaque jour, Kasa fait partie des leaders de la location d’appartements entre particuliers en France.

Le site de Kasa a été codé il y a maintenant plus de 10 ans en ASP.NET avec un code legacy important. Laura, la CTO, a donc lancé une refonte totale pour passer à une stack complète en JavaScript avec NodeJS côté back-end, et React côté front-end. Kasa en a également profité pour commander de nouvelles maquettes auprès de son designer habituel, qui est en freelance. Un gros chantier pour cette année !

### Mes objectifs :

Démarrer le projet React et développer l’ensemble de l’application, les composants React, les routes React Router, en suivant les maquettes Figma (responsives !) et toutes les infos ci-dessous.

#### Contraintes techniques :

##### Découpage en composants modulaires et réutilisables :

-   Un composant par fichier ;

*   Structure logique des différents fichiers ;
*   Utilisation des props entre les composants ;
*   Utilisation du state dans les composants quand c'est nécessaire ;
*   Gestion des événements ;
*   Listes.

##### Recat Routeur :

-   Les paramètres des routes sont gérés par React Router dans l'URL pour récupérer les informations de chaque logement :

*   Il existe une page par route.
*   La page 404 est renvoyée pour chaque route inexistante, ou si une valeur présente dans l’URL ne fait pas partie des données renseignées.
*   La logique du routeur est réunie dans un seul fichier.

##### Générales :

-   Le code ne doit pas produire d'erreur ou de warning dans la console.

*   Styling: Tout le style CSS doit être codé en utilisant Sass.
*   Pas de librairie React externe

#### Contraintes fonctionnelles :

-   Pour le défilement des photos dans la galerie (composant Gallery) :
    Si l'utilisateur se trouve à la première image et qu'il clique sur "Image précédente", la galerie affiche la dernière image.
    Inversement, quand l'image affichée est la dernière de la galerie, si l'utilisateur clique sur "Image suivante", la galerie affiche la première image.
    S'il n'y a qu'une seule image, les boutons "Suivant" et "Précédent" ainsi que la numérotation n'apparaissent pas.
    La galerie doit toujours rester de la même hauteur, celle indiquée sur la maquette Figma. Les images seront donc coupées et centrées dans le cadre de l’image.

-   Collapse : Par défaut, les Collapses sont fermés à l'initialisation de la page.
    Si le Collapse est ouvert, le clic de l'utilisateur permet de le fermer.
    Inversement, si le Collapse est fermé, un clic permet de l'ouvrir.

## Projet avec modifications test Créative Formation :

### Mes objectifs :

Ajout d'une partie **CRUD** (create, read, update, delete)

Permettre à un modérateur de pourvoir ajouter, supprimer, modifier un hébérgement.

#### Mes ajouts :

##### Front-end :

-   Ajout d'une **interface de connexion** ;

*   Ajout d'un **intercepteur** pour gérer la deconnexion ;
*   Ajout d'un **loader** pour lest temps de chargement (**react-loader-spinner**) ;
*   Ajout d'une page pour éditer un hébérgement (ajouter ou modifier) ;
*   Ajout d'un cta dans la page housing permettant de supprimer l'hébérgement en question ;
*   Ajout de toast pour afficher un message de validation lors de la création/suppression/modification d'un hébérgement et lorsque l'utilisateur est déconnecté (**React-toastify**).

##### Back-end :

-   Configuration d'une base de données **NoSQL** (**mongoDB**)

*   Création d'un serveur avec **node.js** ;
*   Branchement de la base de données à l'API ;
*   Création d'un **app express** pour gérer les différentes requètes envoyé vers le serveur ;
*   Création des différentes **routes** ainsi que de leur **controllers** :
    -   GET ;
    *   GET:id ;
    *   POST ;
    *   PUT ;
    *   DELETE.
*   Ajout de la dependance **express-validation** pour sécurisé les données envoyer dans req.body ;
*   Hachage du mot de passe avec **bcrypte** lors de l'ajout d'un nouvel utilisteur ;
*   Decryptage du token pour l'authentification avec le jwt (**json-web-token**) ;
*   Ajout de **tests d'intégration** pour tester les différentes routes de l'API (**jest** et **supertest**) ;
*   Ajout d'une documentation swagger de l'API.

## Lien vers le projet initial

Lien :[GitHub Repo](https://github.com/Elyrria/Kasa-presentation)
