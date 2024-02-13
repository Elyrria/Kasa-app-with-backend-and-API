import Carousel from "../../components/Carousel"
import Collapse from "../../components/Collapse"
import HostRatings from "../../components/HostRatings"
import Tags from "../../components/Tags"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import "../Housings/Housing.scss"
import "./HousingEditor.scss"

function HousingEditor() {
    return (
        <main>
            <div className="housingEditorContaineur">
                <div className="housingEditorContaineur__dynamicDisplay">
                    <Carousel pictures={[]} title={""} id={""} />
                    <div className="container">
                        <div className="container__titlesTagsHost">
                            <div>
                                <div className="titles">
                                    <h2 className="titles__titleHousing">
                                        {""}
                                    </h2>
                                    <h3 className="titles__location">{""}</h3>
                                </div>
                                <Tags className="tag" tags={[]} id={""} />
                            </div>
                            <HostRatings
                                className="hostRating"
                                hostRating={""}
                                hostName={""}
                                hostPicture={""}
                            />
                        </div>
                        <div className="collapses collapsesHousings">
                            <Collapse name={"Description"} description={""} />
                            <Collapse name={"Équipement"} equipments={""} />
                        </div>
                    </div>
                </div>

                <form className="housingEditorContaineur__form" onSubmit={""}>
                    <label htmlFor="title">Titre de l'annonce :</label>
                    <input type="text" id="title" name="title"></input>
                    <label htmlFor="cover">Couverture :</label>
                    <input
                        type="text"
                        id="cover"
                        name="cover"
                        placeholder="http:// ou https://"
                    />
                    <div className="form__addPicture">
                        <div className="form__addPicture-input">
                            <label htmlFor="pictures">
                                Photos de l'hébérgement :
                            </label>
                            <input
                                type="text"
                                id="pictures"
                                name="pictures"
                                placeholder="http:// ou https://"
                            />
                            <div className="buttonForm">
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="buttonForm__addIcon"
                                />
                                <span className="buttonForm__visibility">
                                    Ajouter
                                </span>
                            </div>
                        </div>
                        <ul></ul>
                    </div>
                    <label htmlFor="description">
                        Description de l'hébérgement :
                    </label>
                    <textarea
                        type="text"
                        id="description"
                        name="description"
                    ></textarea>
                    <label htmlFor="host">Nom et Prénom de l'hôte :</label>
                    <input type="text" id="host" name="host" />
                    <label htmlFor="pictureHost">Photo de l'hôte :</label>
                    <input
                        type="text"
                        id="pictureHost"
                        name="pictureHost"
                        placeholder="http:// ou https://"
                    />
                    <label htmlFor="rating">Note de l'hôte :</label>
                    <input type="number" id="rating" name="rating" />

                    <div className="form__addEquipments">
                        <div className="form__addEquipments-input">
                            <label htmlFor="equipments">
                                Équipements de l'hébérgement :
                            </label>
                            <input
                                type="text"
                                id="equipments"
                                name="equipments"
                            />
                            <div className="buttonForm">
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="buttonForm__addIcon"
                                />
                                <span className="buttonForm__visibility">
                                    Ajouter
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="form__addTags">
                        <div className="form__addTags-input">
                            <label htmlFor="tags">Tags :</label>
                            <input type="text" id="tags" name="tags" />
                            <div className="buttonForm">
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="buttonForm__addIcon"
                                />
                                <span className="buttonForm__visibility">
                                    Ajouter
                                </span>
                            </div>
                        </div>
                    </div>

                    <button className="submitButton">Valider</button>
                </form>
            </div>
        </main>
    )
}

export default HousingEditor
