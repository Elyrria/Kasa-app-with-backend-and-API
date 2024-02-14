import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
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
    const handlePictureAdd = () => {
        console.log("Picture")
        let inputPictureValue = document.getElementById("pictures").value
        if (!inputPictureValue) {
            return
        }
        if (inputPictures.includes(inputPictureValue)) {
            console.error("La photo est déjà présente")
            return
        }
        setInputPictures([...inputPictures, inputPictureValue])
        console.log(inputPictures)
        inputPictureValue = ""
    }

    const handleEquipmentAdd = () => {
        console.log("Equipment")
    }

    const handleTagAdd = () => {
        console.log("Tag")
    }
    // const [dataFormulaire, setDataFormulaire] = useState("")
    // const navigate = useNavigate()
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(
            "formulaire : " + inputTitle,
            inputLocation,
            inputCover,
            inputPictures,
            inputDescription,
            inputHostName,
            inputHostPicture,
            inputHostRang,
            inputEquipments,
            inputTags
        )
        // dataToSend() // Appel de la fonction qui va gérer la création de data dans un seul objet
        // Fetch avec axios
        // navigate("/") // Redirection
    }

    // const dataToSend = () => {
    //Fontion qui va permettre de récupérer toutes les datas des différents states des inputs pour les préparer à l'envoi à l'API
    // setDataFormulaire() // Appel de la fonction pour mettre à jour dataFormulaire
    // }

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
                <ul>
                    {inputPictures.map((picture, index) => (
                        <li key={index}>{`Picture ${index + 1}`}</li>
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
            </div>

            <button className="submitButton">Valider</button>
        </form>
    )
}

export default FormHousing
