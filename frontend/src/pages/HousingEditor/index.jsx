import FormHousing from "../../components/FormHousing"
import Carousel from "../../components/Carousel"
import Collapse from "../../components/Collapse"
import HostRatings from "../../components/HostRatings"
import Tags from "../../components/Tags"
import Card from "../../components/Card"
import { useState, useEffect } from "react"
import { useDatas } from "../../utils/Hooks"
import { Audio } from "react-loader-spinner"
import "../../styles/loader.scss"
import "../Housings/Housing.scss"
import "./HousingEditor.scss"
// Amélioration à prévoir pour éviter d'afficher le contenu : hook pour récupérer les data de l'hébérgement passé en id
function HousingEditor() {
    const [inputTitle, setInputTitle] = useState("")
    const [inputLocation, setInputLocation] = useState("")
    const [inputCover, setInputCover] = useState("")
    const [inputPictures, setInputPictures] = useState([])
    const [inputDescription, setInputDescription] = useState("")
    const [inputHostName, setInputHostName] = useState("")
    const [inputHostPicture, setInputHostPicture] = useState("")
    const [inputHostRang, setInputHostRang] = useState("")
    const [inputEquipments, setInputEquipments] = useState([])
    const [inputTags, setInputTags] = useState([])
    
    const { loadingHousingsData } = useDatas()

    useEffect(() => {
        document.title = inputTitle || "Housing Editor"
    }, [inputTitle, loadingHousingsData])
    if (!loadingHousingsData) {
        return (
            <main>
                <div className="housingEditorContaineur">
                    <div className="housingEditorContaineur__dynamicDisplay">
                        <Carousel
                            pictures={inputPictures}
                            title={inputTitle}
                            id={"housingEditor"}
                        />
                        <div className="container">
                            <div className="container__titlesTagsHost">
                                <div>
                                    <div className="titles">
                                        <h2 className="titles__titleHousing">
                                            {inputTitle}
                                        </h2>
                                        <h3 className="titles__location">
                                            {inputLocation}
                                        </h3>
                                    </div>
                                    <Tags
                                        className="tag"
                                        tags={inputTags}
                                        id={"tag"}
                                    />
                                </div>
                                <HostRatings
                                    className="hostRating"
                                    hostRating={inputHostRang}
                                    hostName={inputHostName}
                                    hostPicture={inputHostPicture}
                                />
                            </div>
                            <div className="collapses collapsesHousings">
                                <Collapse
                                    name={"Description"}
                                    description={inputDescription}
                                />
                                <Collapse
                                    name={"Équipement"}
                                    equipments={inputEquipments}
                                />
                            </div>
                        </div>
                    </div>
                    <Card title={inputTitle} cover={inputCover} />
                    <FormHousing
                        inputTitle={inputTitle}
                        setInputTitle={setInputTitle}
                        inputLocation={inputLocation}
                        inputCover={inputCover}
                        setInputCover={setInputCover}
                        inputPictures={inputPictures}
                        setInputPictures={setInputPictures}
                        inputDescription={inputDescription}
                        setInputDescription={setInputDescription}
                        inputHostName={inputHostName}
                        setInputHostName={setInputHostName}
                        inputHostPicture={inputHostPicture}
                        setInputHostPicture={setInputHostPicture}
                        inputHostRang={inputHostRang}
                        setInputHostRang={setInputHostRang}
                        inputEquipments={inputEquipments}
                        setInputEquipments={setInputEquipments}
                        inputTags={inputTags}
                        setInputTags={setInputTags}
                        setInputLocation={setInputLocation}
                    />
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

export default HousingEditor
