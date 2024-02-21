const addHousingRequestNotCompliant = {
    //? Title :
    //ExpectedResult : noEmpty
    emptyTitle: "",
    //Type : number
    //ExpectedResult : string
    numberTitle: 1458,
    //ExpectedResult : 100
    lengthTitle:
        "Housing test Housing test Housing test Housing test Housing test Housing test Housing test Housing test",
    //? Cover :
    //ExpectedResult : noEmpty
    emptyCover: "",
    //Type : number
    //ExpectedResult : string
    numberCover: 1412,
    //? Pictures :
    //Type : object
    //ExpectedResult : array
    notArrayPictures: { pictures: "Picture Test" },
    //? Description :
    //ExpectedResult : noEmpty
    emptyDescription: "",
    //ExpectedResult : string
    numberDescription: 1258,
    //ExpectedResult : 500
    lengthDescription:
        "Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test Description test",
    //? Location :
    //Type : number
    //ExpectedResult : string
    numberLocation: 1458,
    //ExpectedResult : 100
    lengthLocation:
        "Location test Location test Location test Location test Location test Location test Location test Location test Location test Location test",
    //ExpectedResult : noEmpty
    emptyLocation: "",
    //? Host :
    //* Host Name :
    //Type : number
    //ExpectedResult : string
    numberHostName: 1458,
    //ExpectedResult : 50
    lengthHostName:
        "Host test Host test Host test Host test Host test Host test Host test Host test Host test Host test",
    //ExpectedResult : noEmpty
    emptyHostName: "",
    //* Host Picture :
    //Type : number
    //ExpectedResult : string
    numberHostPicture: 1458,
    //ExpectedResult : noEmpty
    emptyHostPicture: "",
    //? Rating :
    //Type : string
    //ExpectedResult : number
    stringRating: "1458",
    //ExpectedResult : 1 to 5
    lowerRating: 0,
    //ExpectedResult : 1 to 5
    higherRating: 6,
    //? Equipments :
    //Type : object
    //ExpectedResult : array
    notArrayEquipment: { equipment: "Equipments test" },
    //? Tags :
    //Type : object
    //ExpectedResult : array
    notArrayTags: { tags: "Tags test" },
}

const addHousingRequestCompliant = {
    title: "Appartement test",
    cover: "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-19-1.jpg",
    pictures: [
        "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-19-1.jpg",
    ],
    description:
        "Au coeur du quartier historique du Marais, cet appartement est idéal pour un couple à la découverte de Paris. Situé sur la rue de Rivoli, il est à 5 minutes du Louvre.",
    location: "Ile de France - Paris 13e",
    host: {
        name: "Nathalie Jean",
        picture:
            "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-12.jpg",
    },
    rating: 4,
    equipments: [
        "Wi-fi",
        "Équipements de base",
        "Micro-Ondes",
        "Frigo",
        "Baignoire",
    ],
    tags: ["Louvre", "Marais", "Rivoli"],
}

module.exports = { addHousingRequestNotCompliant, addHousingRequestCompliant }
