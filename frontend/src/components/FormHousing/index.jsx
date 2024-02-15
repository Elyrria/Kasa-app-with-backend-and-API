import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { SharedDataLoginContext } from "../../utils/Context/UserLogin"
import { useContext } from "react"
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
    const { dataLogin } = useContext(SharedDataLoginContext)

    //! Amélioration à prévoir : Réalisation d'un hook pour l'ajout d'un élément et un hook pour la suppression d'un élément (suppression de toutes les fonctions handlePicture + handleDelete, ...)

    const handlePictureAdd = () => {
        let inputPictureValue = document.getElementById("pictures").value
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
        console.log(inputEquipments)
    }

    const handleDeleteEquipment = (index) => {
        const newInputEquipment = [...inputEquipments]
        newInputEquipment.splice(index, 1) // Supprime l'élément dans le tableau
        setInputEquipments(newInputEquipment)
    }

    const handleTagAdd = () => {
        console.log("Tag")
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
        console.log(inputTags)
    }

    const handleDeleteTag = (index) => {
        const newInputTags = [...inputTags]
        newInputTags.splice(index, 1) // Supprime l'élément dans le tableau
        setInputTags(newInputTags)
    }

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

        console.log(dataLogin)
        const config = {
            headers: {
                Authorization: `Bearer ${dataLogin.token}`, // Ajouter le token d'autorisation dans l'en-tête
                UserId: dataLogin.userId, // Ajouter le userId dans l'en-tête
            },
        }
        // dataToSend() // Appel de la fonction qui va gérer la création de data dans un seul objet
        axios
            .post("http://localhost:3001/api/housing", housing, config)
            .then((res) => {
                console.log(res)
                console.log("Hébérgement créé")
                window.location.href = "/"
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <form className="housingEditorContaineur__form" onSubmit={onSubmit}>
            <label htmlFor="title">Titre de l'annonce :</label>
            <input
                type="text"
                id="title"
                name="title"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
            />
            <label htmlFor="location">Lieu :</label>
            <input
                type="text"
                id="location"
                name="location"
                value={inputLocation}
                onChange={(e) => setInputLocation(e.target.value)}
            />
            <label htmlFor="cover">Couverture :</label>
            <input
                type="text"
                id="cover"
                name="cover"
                placeholder="http:// ou https://"
                value={inputCover}
                onChange={(e) => {
                    setInputCover(e.target.value)
                }}
            />
            <div className="form__addPicture">
                <div className="form__addPicture-input">
                    <label htmlFor="pictures">Photos de l'hébérgement :</label>
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
            <label htmlFor="description">Description de l'hébérgement :</label>
            <textarea
                type="text"
                id="description"
                name="description"
                value={inputDescription}
                onChange={(e) => {
                    setInputDescription(e.target.value)
                }}
            ></textarea>
            <label htmlFor="host">Prénom et Nom de l'hôte :</label>
            <input
                type="text"
                id="host"
                name="host"
                value={inputHostName}
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
                value={inputHostPicture}
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
                value={inputHostRang}
                onChange={(e) => {
                    setInputHostRang(e.target.value)
                }}
            />

            <div className="form__addEquipments">
                <div className="form__addEquipments-input">
                    <label htmlFor="equipments">
                        Équipements de l'hébérgement :
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

            <button className="submitButton">Valider</button>
        </form>
    )
}

export default FormHousing
