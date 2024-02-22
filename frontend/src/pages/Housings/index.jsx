import Carousel from "../../components/Carousel"
import Collapse from "../../components/Collapse"
import Tags from "../../components/Tags"
import HostRatings from "../../components/HostRatings"
import axios from "axios"
import { useEffect, useContext, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { SharedDataLoginContext } from "../../utils/Context/UserLogin"
import { SharedDataLogoutContext } from "../../utils/Context/UserLogout"
import { SharedDataModifyHousingContext } from "../../utils/Context/ModifyHousing"
import { SharedActiveToastBar } from "../../utils/Context/ActiveToastBar"
import { useDatas } from "../../utils/Hooks"
import { Audio } from "react-loader-spinner"
import "../../styles/loader.scss"
import "./Housing.scss"

//! Ajout d'un hook pour valider l'id des hébergements et d'un hook pour récupérer l'ébérgement avec l'id
function Housings() {
    window.localStorage.removeItem("toModify") // Suppression du token toModify du localStorage
    //Récupération des données depuis le context UserContext
    const { isLogin, dataLogin, setIsLogin, setDataLogin } = useContext(
        SharedDataLoginContext
    )
    const { setIsLogout } = useContext(SharedDataLogoutContext)
    //Récupération des données depuis le context ModifyHousing
    const { setModifyMode, setToModify } = useContext(
        SharedDataModifyHousingContext
    )
    const { setIsActiveToastBar, setMessageToastBar } =
        useContext(SharedActiveToastBar)
    const [loadingHousingData, setLoadingHousingData] = useState(true) // État pour le chargement
    const [housing, setHousing] = useState({}) // Données de l'hébergement
    const { housingsData, loadingHousingsData } = useDatas()
    const navigate = useNavigate()
    const location = useLocation()
    //Permet de récupérer la clé de la route enfant (tous ce qui est après hebergement/)
    const { id } = useParams()
    //! Amélioration possible : créer un hook pour les configuration axios pour les instances
    //Configuration d'axios pour l'ajout d'un intercepteur
    const instance = axios.create({
        baseURL: "http://localhost:3001/api/",
    })

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            const status = error.response ? error.response.status : null
            if (status === 401) {
                // Supprime les éléments validant la connexion
                window.sessionStorage.removeItem("userData")
                setIsLogin(false)
                setDataLogin(null)
                setIsLogout(true) // Changement de l'état à true pour afficher la toastbar sur la page login
                navigate("/login") // Redirigez l'utilisateur vers la page de connexion
            } else {
                console.error("L'erreur de statut est la suivante :" + status)
            }
            return Promise.reject(error)
        }
    )

    const handleDeletHousing = (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${dataLogin.token}`, // Ajouter le token d'autorisation dans l'en-tête
            },
        }
        instance
            .delete(`/housing/${id}`, config)
            .then(() => {
                setMessageToastBar("L'hébergement a bien été supprimé")
                setIsActiveToastBar(true)
                navigate("/")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleModifyHousing = (id) => {
        setModifyMode(true)
        setToModify(true)
        navigate(`/edition_hebergement/${id}`) // Redirige vers la home page
    }

    useEffect(() => {
        document.title = housing.title
        if (loadingHousingsData) {
            // Permet de vérifier si housing contien des données si oui, ne rien faire
            if (Object.keys(housing).length > 0) {
                return
            } else {
                axios
                    .get(`http://localhost:3001/api/housing/${id}`)
                    .then((res) => {
                        setHousing(res.data.housing)
                        setLoadingHousingData(false) // Met à jour l'état une fois les données récupérées
                    })
                    .catch((error) => {
                        setLoadingHousingData(false) // Met à jour l'état une fois les données récupérées
                        if (error.response.status === 400) {
                            navigate("/error")
                        }
                    })
            }
        }
    }, [id, housing, navigate, housingsData, loadingHousingsData])

    useEffect(() => {
        if (!loadingHousingData && !loadingHousingsData) {
            const isValid = isValidate(id, housingsData)
            // Si isValid renvoie false alors redirige vers la page d'erreur
            if (!isValid) {
                navigate("/error")
            }
        }
    }, [
        id,
        location,
        navigate,
        housingsData,
        loadingHousingData,
        loadingHousingsData,
    ])

    if (!loadingHousingData && !loadingHousingsData) {
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
                                className="submitButton"
                                onClick={() => handleModifyHousing(id)}
                            >
                                Modifier
                            </button>
                            <button
                                className="submitButton"
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
        return (
            <main>
                <div className="loading">
                    <Audio
                        height="80"
                        width="80"
                        radius="9"
                        color="#ff6060"
                        ariaLabel="loading"
                        wrapperStyle
                        wrapperClass
                    />
                </div>
            </main>
        )
    }
}

const isValidate = (id, housings) => {
    //Récupération de tous les ids
    const idDataHousings = housings.map((house) => house._id)
    //Vérification si id est bien compris dans le tableau des ids
    return idDataHousings.includes(id)
}

export default Housings
