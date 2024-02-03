Pour démarer l'API et le serveur en local utilisation de la commande :
<!-- TODO nodemon --> 
en ligne de commande.
                                                                                                                      
                                                            <!--? ROUTES -->
                                                    <!--!   Authentification -->
                                             <!--* Création d'un nouvel utilisateur -->
<!--!! Front-end non implémenter => passer par Postman ou autre pour tester la route. -->
Route : http://localhost:3001/api/auth/signup
Verbe : POST
                                                        Requète body === Objet
{
    email : string,
    password: string
}
                                                        Réponse body === Objet
                                                            res.status = 201 :
{ 
    message : utilisateur crée ! 
}
                                                            res.status = 500 : 
erreur serveur
                                                        <!--* Connexion -->

Route : http://localhost:3001/api/auth/login
Verbe : POST

                                                        Requète body === Objet
{
    email : string,
    password: string
}
                                                       Réponse body === Objet
                                                            res.status = 200 :
{
    userId : string,
    token : string
}
                                                            res.status = 401 :
{ 
    message: Paire identifiant/mot de passe incorrecte ! 
}
                                                            res.status = 500 :
erreur serveur
                                                    <!--!   Données Hébérgements -->
                                             <!--* Récupération des données des hébérgements -->
Route : http://localhost:3001/api/housing
Verbe : GET
                                                        Réponse body === Objet
                                                            res.status = 200 : 
{
   housings : 
   [
        { 
            host : 
                {
                    name : string,
                    picture : string
                },
            _id : string,
            title :string,
            cover : string,
            pictures : [string],
            description : string,
            rating : number,
            equipements : [string],
            tags : [string]
        },
    ]
}
                                                            res.status = 400 :
Bad request
                                             <!--* Récupération des données d'un hébérgement -->
Route : http://localhost:3001/api/housing/:id
Verbe : GET
                                                        Requète body === Objet

                                                            res.status = 200 :
{
    housing : 
        { 
            host : 
                {
                    name : string,
                    picture : string
                },
            _id : string,
            title :string,
            cover : string,
            pictures : [string],
            description : string,
            rating : number,
            equipements : [string],
            tags : [string]
        }
}
                                                            res.status = 400 :
Bad request
                                                    <!--!   Données À propos  -->
                                                <!--* Ajout d'une nouvelle donnée À propos -->
<!--!! Front-end non implémenter => passer par Postman ou autre pour tester la route. -->
Route : http://localhost:3001/api/about/
Verbe : POST
                                                        Requète body === Objet
{
    name : string,
    description : string
}
                                                        Réponse body === Objet
                                                            res.status = 201 :
{ 
    message : utilisateur crée ! 
}
                                                            res.status = 500 :
erreur serveur
                                                <!--* Récupération des données À propos -->
Route : http://localhost:3001/api/about/
Verbe : GET
                                                        Réponse body === Objet
                                                            res.status = 200 :
{
    abouts : [
        {
            _id : string,
            name : string, 
            description :string
        },
        {
            _id : string,
            name : string, 
            description :string
        },
        {
            _id : string,
            name : string, 
            description :string
        },
        {
            _id : string,
            name : string, 
            description :string
        },
    ]
}
                                                            res.status = 400 :
Bad request