// import dataHousings from "../../datas/housings.json"
import Carousel from "../../components/Carousel"
import Collapse from "../../components/Collapse"
import Tags from "../../components/Tags"
import HostRatings from "../../components/HostRatings"
import "./Housing.scss"
import { useEffect, useContext } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { useFetch } from "../../utils/Hooks"
import { SharedDataContext } from "../../utils/Context"

function Housings() {
    //récupération des données depuis le context
    const [dataHousings] = useContext(SharedDataContext)
    const navigate = useNavigate()
    const location = useLocation()
    //Permet de récupérer la clé de la route enfant (tous ce qui est après hebergement/)
    const { id } = useParams()

    const { data, loading } = useFetch(
        `http://localhost:3001/api/housing/${id}`
    )
    // Récupération de la propriété housing et stockage dans la variable housing de l'objet data
    const { housing } = data

    useEffect(() => {
        if (loading || !dataHousings) {
            return // Si les données ne sont pas encore chargées ou housings n'est pas défini, ne rien faire
        } else {
            const isValid = isValidate(id, dataHousings)
            // Si isValid renvoie false alors redirige vers la page d'erreur
            if (!isValid) {
                navigate("/error")
            }
        }
    }, [id, location, navigate, dataHousings, loading])

    useEffect(() => {
        if (loading || !dataHousings) {
            return // Si les données ne sont pas encore chargées ou housings n'est pas défini, ne rien faire
        } else {
            const housingData = getDatabyId(id, dataHousings)
            // Si housingData est strictement égale à null alors redirige vers la page d'erreur
            if (housingData === null) {
                navigate("/error")
            } else {
                document.title = housingData.title
            }
        }
    }, [id, navigate, dataHousings, loading])

    // Si loading est true ou dataHousings n'existe pas alors :
    if (loading || !dataHousings) {
        return // Si les données ne sont pas encore chargées ou housings n'est pas défini, ne rien faire
    } else {
        const housingData = getDatabyId(id, dataHousings)
        // Si housingData n'existe pas alors retun null
        if (!housingData) {
            return null
        }
    }

    if (loading || !housing) {
        // console.log("DataHousings:", housings.host.name)
        return <div>Loading...</div>
    } else {
        return (
            <main>
                <Carousel
                    pictures={housing.pictures}
                    title={housing.title}
                    id={housing._id}
                />
                <div className="container">
                    <div className="container__titlesTagsHost">
                        <div>
                            <div className="titles">
                                <h2 className="titles__titleHousing">
                                    {housing.title}
                                </h2>
                                <h3 className="titles__location">
                                    {housing.location}
                                </h3>
                            </div>
                            <Tags className="tag" tags={housing.tags} id={id} />
                        </div>
                        <HostRatings
                            className="hostRating"
                            hostRating={housing.rating}
                            hostName={housing.host.name}
                            hostPicture={housing.host.picture}
                        />
                    </div>
                    <div className="collapses collapsesHousings">
                        <Collapse
                            name={"Description"}
                            description={housing.description}
                        />
                        <Collapse
                            name={"Équipement"}
                            equipments={housing.equipments}
                        />
                    </div>
                </div>
            </main>
        )
    }
}

const isValidate = (id, dataHousings) => {
    //Récupération de tous les ids
    const idDataHousings = dataHousings.map((house) => house._id)
    console.log(idDataHousings)
    //Vérification si id est bien compris dans le tableau des ids
    return idDataHousings.includes(id)
}

const getDatabyId = (id, dataHousings) => {
    const foundData = dataHousings.find((item) => item._id === id)
    console.log(foundData)

    if (foundData) {
        return foundData
    } else {
        return null
    }
}

export default Housings