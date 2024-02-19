// import dataHousings from "../../datas/housings.json"
import Carousel from "../../components/Carousel"
import Collapse from "../../components/Collapse"
import Tags from "../../components/Tags"
import HostRatings from "../../components/HostRatings"
import axios from "axios"
import "./Housing.scss"
import { useEffect, useContext, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { SharedDataLoginContext } from "../../utils/Context/UserLogin"
import { SharedDataModifyHousingContext } from "../../utils/Context/ModifyHousing"
import { SharedActiveToastBar } from "../../utils/Context/ActiveToastBar"

function Housings() {
    //Récupération des données depuis le context UserContext
    const { isLogin, dataLogin } = useContext(SharedDataLoginContext)
    //Récupération des données depuis le context ModifyHousing
    const { setModifyMode, setToModify } = useContext(
        SharedDataModifyHousingContext
    )
    const { setIsActiveToastBar, setMessageToastBar } =
        useContext(SharedActiveToastBar)
    const [loadingDataHousing, setLoadingDataHousing] = useState(true) // État pour le chargement
    const [loadingDataHousings, setLoadingDataHousings] = useState(true) // État pour le chargement
    const [housing, setHousing] = useState({}) // Données de l'hébérgement
    const [housings, setHousings] = useState([]) // Données des hébérgements
    const navigate = useNavigate()
    const location = useLocation()
    //Permet de récupérer la clé de la route enfant (tous ce qui est après hebergement/)
    const { id } = useParams()

    const handleDeletHousing = (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${dataLogin.token}`, // Ajouter le token d'autorisation dans l'en-tête
            },
        }
        axios
            .delete(`http://localhost:3001/api/housing/${id}`, config)
            .then((res) => {
                setMessageToastBar("L'hébérgement a bien été supprimé")
                setIsActiveToastBar(true)
                navigate("/")
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const handleModifyHousing = (id) => {
        setModifyMode(true)
        setToModify(true)
        navigate(`/edition_hebergement/${id}`) // Redirige vers la home page
    }

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/housing")
            .then((res) => {
                setHousings(res.data.housings)
                setLoadingDataHousings(false)
            })
            .catch((error) => {
                console.error(error)
                setLoadingDataHousings(false)
            })
        axios
            .get(`http://localhost:3001/api/housing/${id}`)
            .then((res) => {
                setHousing(res.data.housing)
                setLoadingDataHousing(false) // Met à jour l'état une fois les données récupérées
            })
            .catch((error) => {
                setLoadingDataHousing(false) // Met à jour l'état une fois les données récupérées
                if (error.response.status === 400) {
                    navigate("/error")
                }
            })
    }, [id, housing, navigate])

    useEffect(() => {
        if (!loadingDataHousing && !loadingDataHousings) {
            const isValid = isValidate(id, housings)
            // Si isValid renvoie false alors redirige vers la page d'erreur
            if (!isValid) {
                navigate("/error")
            }
        }
    }, [
        id,
        location,
        navigate,
        housings,
        loadingDataHousing,
        loadingDataHousings,
    ])

    useEffect(() => {
        if (!loadingDataHousing && !loadingDataHousings) {
            const housingData = getDatabyId(id, housings)
            // Si housingData est strictement égale à null alors redirige vers la page d'erreur
            if (housingData === null) {
                navigate("/error")
            } else {
                document.title = housing.title
            }
        }
    }, [
        id,
        navigate,
        housings,
        housing,
        loadingDataHousing,
        loadingDataHousings,
    ])

    if (!loadingDataHousing && !loadingDataHousings) {
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
                    {isLogin ? (
                        <div className="manageHousing">
                            <button
                                className="manageHousing__button"
                                onClick={() => handleModifyHousing(id)}
                            >
                                Modifier
                            </button>
                            <button
                                className="manageHousing__button"
                                onClick={() => handleDeletHousing(id)}
                            >
                                Supprimer
                            </button>
                        </div>
                    ) : null}
                </div>
            </main>
        )
    } else {
        return <div>Loading...</div>
    }
}

const isValidate = (id, housings) => {
    //Récupération de tous les ids
    const idDataHousings = housings.map((house) => house._id)
    //Vérification si id est bien compris dans le tableau des ids
    return idDataHousings.includes(id)
}

const getDatabyId = (id, housings) => {
    const foundData = housings.find((item) => item._id === id)
    if (foundData) {
        return foundData
    } else {
        return null
    }
}

export default Housings
