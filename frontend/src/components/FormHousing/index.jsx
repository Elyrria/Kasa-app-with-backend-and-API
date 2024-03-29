import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useParams, useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { SharedDataLoginContext } from "../../utils/Context/UserLogin"
import { SharedDataLogoutContext } from "../../utils/Context/UserLogout"
import { SharedDataModifyHousingContext } from "../../utils/Context/ModifyHousing"
import { SharedActiveToastBar } from "../../utils/Context/ActiveToastBar"
import { useDatas } from "../../utils/Hooks"

import "./FormHousing.scss"

function FormHousing({
    inputTitle,
    setInputTitle,
    inputLocation,
    setInputLocation,
    inputCover,
    setInputCover,
    inputPictures,
    setInputPictures,
    inputDescription,
    setInputDescription,
    inputHostName,
    setInputHostName,
    inputHostPicture,
    setInputHostPicture,
    inputHostRang,
    setInputHostRang,
    inputEquipments,
    setInputEquipments,
    inputTags,
    setInputTags,
}) {
    const { dataLogin, setDataLogin, setIsLogin } = useContext(
        SharedDataLoginContext
    )
    const { setIsLogout } = useContext(SharedDataLogoutContext)
    const { setIsActiveToastBar, setMessageToastBar } =
        useContext(SharedActiveToastBar)
    const { id } = useParams() // Récupération de l'id contenu dans l'url
    const navigate = useNavigate()
    const { modifyMode, setModifyMode, toModify, setToModify } = useContext(
        SharedDataModifyHousingContext
    )
    const { housingsData, loadingHousingsData } = useDatas()
    const currentURL = window.location.href

    //! Amélioration à prévoir : Réalisation d'un hook pour l'ajout d'un élément et un hook pour la suppression d'un élément (suppression de toutes les fonctions handlePicture + handleDelete, ...)
    //! Ajout d'un hook pour valider l'id des hébergements

    const handlePictureAdd = () => {
        const inputPictureValue = document.getElementById("pictures").value
        if (!inputPictureValue) {
            return
            //!Afficher un message à l'utilisateur
        }
        if (inputPictures.includes(inputPictureValue)) {
            console.error("La photo est déjà présente")
            return
        }
        setInputPictures([...inputPictures, inputPictureValue])
        document.getElementById("pictures").value = ""
    }

    const handleDeletePicture = (index) => {
        const newInputPicture = [...inputPictures]
        newInputPicture.splice(index, 1) // Supprime l'élément dans le tableau
        setInputPictures(newInputPicture)
    }

    const handleEquipmentAdd = () => {
        let inputEquipmentsValue = document.getElementById("equipments").value
        if (!inputEquipmentsValue) {
            return
            //!Afficher un message à l'utilisateur
        }
        if (inputEquipments.includes(inputEquipmentsValue)) {
            console.error("L'équipement est déjà présent'")
            return
        }
        setInputEquipments([...inputEquipments, inputEquipmentsValue])
        document.getElementById("equipments").value = ""
    }

    const handleDeleteEquipment = (index) => {
        const newInputEquipment = [...inputEquipments]
        newInputEquipment.splice(index, 1) // Supprime l'élément dans le tableau
        setInputEquipments(newInputEquipment)
    }

    const handleTagAdd = () => {
        let inputTagsValue = document.getElementById("tags").value
        if (!inputTagsValue) {
            return
            //!Afficher un message à l'utilisateur
        }
        if (inputTags.includes(inputTagsValue)) {
            console.error("Le tag est déjà présent'")
            return
        }
        setInputTags([...inputTags, inputTagsValue])
        document.getElementById("tags").value = ""
    }

    const handleDeleteTag = (index) => {
        const newInputTags = [...inputTags]
        newInputTags.splice(index, 1) // Supprime l'élément dans le tableau
        setInputTags(newInputTags)
    }
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
    // const [dataFormulaire, setDataFormulaire] = useState("")
    const onSubmit = (e) => {
        e.preventDefault()

        const housing = {
            title: inputTitle,
            cover: inputCover,
            pictures: inputPictures,
            description: inputDescription,
            host: {
                name: inputHostName,
                picture: inputHostPicture,
            },
            rating: inputHostRang,
            location: inputLocation,
            equipments: inputEquipments,
            tags: inputTags,
        }
        localStorage.removeItem("toModify")
        //! Amélioration ajouter les configs au userContext ou avec une config hook axios
        const config = {
            headers: {
                Authorization: `Bearer ${dataLogin.token}`, // Ajouter le token d'autorisation dans l'en-tête
            },
        }
        if (modifyMode) {
            instance
                .put(`/housing/${id}`, housing, config)
                .then(() => {
                    setModifyMode(false)
                    setMessageToastBar("L'hébergement a bien été modifié")
                    setIsActiveToastBar(true)
                    navigate("/")
                })
                .catch((error) => {
                    console.error(error)
                })
        } else {
            instance
                .post("/housing", housing, config)
                .then(() => {
                    setMessageToastBar("L'hébergement a bien été créé")
                    setIsActiveToastBar(true)
                    navigate("/")
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }

    useEffect(() => {
        const toModifyLocalStorage = JSON.parse(
            localStorage.getItem("toModify")
        )

        // Permet d'éviter le GET si page de création
        if (currentURL === "http://localhost:3000/edition_hebergement") {
            return
        } else {
            if (toModify || toModifyLocalStorage) {
                axios
                    .get(`http://localhost:3001/api/housing/${id}`)
                    .then((res) => {
                        //Permet de recharger les données si un reload de la page est effectué
                        if (!toModifyLocalStorage) {
                            localStorage.setItem(
                                "toModify",
                                JSON.stringify(true)
                            )
                        } else {
                            setToModify(true)
                            setModifyMode(true)
                        }

                        const housing = res.data.housing
                        setInputTitle(housing.title)
                        setInputLocation(housing.location)
                        setInputCover(housing.cover)
                        setInputPictures(housing.pictures)
                        setInputDescription(housing.description)
                        setInputHostName(housing.host.name)
                        setInputHostPicture(housing.host.picture)
                        setInputHostRang(housing.rating)
                        setInputEquipments(housing.equipments)
                        setInputTags(housing.tags)
                        setToModify(false)
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }
        }
    }, [
        id,
        setInputCover,
        setInputDescription,
        setInputEquipments,
        setInputHostName,
        setInputHostPicture,
        setInputHostRang,
        setInputLocation,
        setInputPictures,
        setInputTags,
        setInputTitle,
        setModifyMode,
        setToModify,
        toModify,
        currentURL,
    ])
    useEffect(() => {
        if (currentURL === "http://localhost:3000/edition_hebergement") {
            return
        } else {
            if (loadingHousingsData && housingsData === undefined) {
                return
            } else {
                const isValid = isValidate(id, housingsData)
                // Si isValid renvoie false alors redirige vers la page d'erreur
                if (!isValid) {
                    navigate("/error")
                }
            }
        }
    }, [housingsData, loadingHousingsData, id, navigate, currentURL])

    return (
        <form className="housingEditorContaineur__form" onSubmit={onSubmit}>
            <label htmlFor="title">Titre de l'annonce :</label>
            <input
                type="text"
                id="title"
                name="title"
                onChange={(e) => setInputTitle(e.target.value)}
            />
            <label htmlFor="location">Lieu :</label>
            <input
                type="text"
                id="location"
                name="location"
                onChange={(e) => setInputLocation(e.target.value)}
            />
            <label htmlFor="cover">Couverture :</label>
            <input
                type="text"
                id="cover"
                name="cover"
                placeholder="http:// ou https://"
                onChange={(e) => {
                    setInputCover(e.target.value)
                }}
            />
            <div className="form__addPicture">
                <div className="form__addPicture-input">
                    <label htmlFor="pictures">Photos de l'hébergement :</label>
                    <input
                        type="text"
                        id="pictures"
                        name="pictures"
                        placeholder="http:// ou https://"
                    />
                    <div className="buttonForm" onClick={handlePictureAdd}>
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="buttonForm__addIcon"
                        />
                        <span className="buttonForm__visibility">Ajouter</span>
                    </div>
                </div>
                <ul className="elementsList__container ">
                    {inputPictures.map((picture, index) => (
                        <div key={index} className="elementsList">
                            <li>{`Picture ${index + 1}`}</li>
                            <FontAwesomeIcon
                                className="iconTarsh"
                                icon={faTrash}
                                onClick={() => handleDeletePicture(index)}
                            />
                        </div>
                    ))}
                </ul>
            </div>
            <label htmlFor="description">Description de l'hébergement :</label>
            <textarea
                type="text"
                id="description"
                name="description"
                onChange={(e) => {
                    setInputDescription(e.target.value)
                }}
            ></textarea>
            <label htmlFor="host">Prénom et Nom de l'hôte :</label>
            <input
                type="text"
                id="host"
                name="host"
                onChange={(e) => {
                    setInputHostName(e.target.value)
                }}
            />
            <label htmlFor="pictureHost">Photo de l'hôte :</label>
            <input
                type="text"
                id="pictureHost"
                name="pictureHost"
                placeholder="http:// ou https://"
                onChange={(e) => {
                    setInputHostPicture(e.target.value)
                }}
            />
            <label htmlFor="rating">Note de l'hôte :</label>
            <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="5"
                placeholder="Note de 1 à 5"
                onChange={(e) => {
                    setInputHostRang(e.target.value)
                }}
            />

            <div className="form__addEquipments">
                <div className="form__addEquipments-input">
                    <label htmlFor="equipments">
                        Équipements de l'hébergement :
                    </label>
                    <input type="text" id="equipments" name="equipments" />
                    <div className="buttonForm" onClick={handleEquipmentAdd}>
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="buttonForm__addIcon"
                        />
                        <span className="buttonForm__visibility">Ajouter</span>
                    </div>
                </div>
                <ul className="elementsList__container">
                    {inputEquipments.map((equipment, index) => (
                        <div key={index} className="elementsList">
                            <li>{equipment}</li>
                            <FontAwesomeIcon
                                className="iconTarsh"
                                icon={faTrash}
                                onClick={() => handleDeleteEquipment(index)}
                            />
                        </div>
                    ))}
                </ul>
            </div>

            <div className="form__addTags">
                <div className="form__addTags-input">
                    <label htmlFor="tags">Tags :</label>
                    <input type="text" id="tags" name="tags" />
                    <div className="buttonForm" onClick={handleTagAdd}>
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="buttonForm__addIcon"
                        />
                        <span className="buttonForm__visibility">Ajouter</span>
                    </div>
                </div>
                <ul className="elementsList__container">
                    {inputTags.map((tag, index) => (
                        <div key={index} className="elementsList">
                            <li>{tag}</li>
                            <FontAwesomeIcon
                                className="iconTarsh"
                                icon={faTrash}
                                onClick={() => handleDeleteTag(index)}
                            />
                        </div>
                    ))}
                </ul>
            </div>

            <button className="submitButton">
                {modifyMode ? "Modifier" : "Valider"}
            </button>
        </form>
    )
}

const isValidate = (id, housingsData) => {
    //Récupération de tous les ids
    const idDataHousings = housingsData.map((house) => house._id)
    //Vérification si id est bien compris dans le tableau des ids
    return idDataHousings.includes(id)
}
export default FormHousing
