import React, { useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import dataHousings from "../../datas/housings.json"
import Carousel from "../../components/Carousel"
import Collapse from "../../components/Collapse"
import Tags from "../../components/Tags"
import HostRatings from "../../components/HostRatings"
import "../../styles/Housing.scss"

function Housings() {
    const navigate = useNavigate()
    const location = useLocation()
    //Permet de récupérer la clé de la route enfant (tous ce qui est après hebergement/)
    const { id } = useParams()

    useEffect(() => {
        const isValid = isValidate(id)

        if (!isValid) {
            navigate("/error")
        }
    }, [id, location, navigate])

    useEffect(() => {
        const housingData = getDatabyId(id, navigate)
        if (housingData === null) {
            navigate("/error")
        } else {
            document.title = housingData.title
        }
    }, [id, navigate])

    const housingData = getDatabyId(id, navigate)

    if (!housingData) {
        return null
    }

    return (
        <main>
            <Carousel
                pictures={housingData.pictures}
                title={housingData.title}
                id={housingData.id}
            />
            <div className="container">
                <div className="container__titlesTagsHost">
                    <div>
                        <div className="titles">
                            <h2 className="titles__titleHousing">
                                {housingData.title}
                            </h2>
                            <h3 className="titles__location">
                                {housingData.location}
                            </h3>
                        </div>
                        <Tags className="tag" tags={housingData.tags} id={id} />
                    </div>
                    <HostRatings
                        className="hostRating"
                        hostRating={housingData.rating}
                        hostName={housingData.host.name}
                        hostPicture={housingData.host.picture}
                    />
                </div>
                <div className="collapses collapsesHousings"> 
                    <Collapse
                        name={"Description"}
                        description={housingData.description}
                    />
                    <Collapse
                        name={"Équipement"}
                        equipments={housingData.equipments}
                    />
                </div>
            </div>
        </main>
    )
}

const isValidate = (id) => {
    //Récupération de tous les ids
    const idDataHousings = dataHousings.map((house) => house.id)
    //Vérification si id est bien compris dans le tableau des ids
    return idDataHousings.includes(id)
}

const getDatabyId = (id) => {
    const foundData = dataHousings.find((item) => item.id === id)

    if (foundData) {
        return foundData
    } else {
        return null
    }
}

export default Housings
