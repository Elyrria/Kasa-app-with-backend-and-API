import "./Card.scss"
import { Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { SharedDataModifyHousingContext } from "../../utils/Context/ModifyHousing"
function Card({ cover, title, id }) {
    const [urlActive, setUrlActive] = useState("")
    const { modifyMode } = useContext(SharedDataModifyHousingContext)
    useEffect(() => {
        setUrlActive(window.location.href)
    }, [setUrlActive])
    if (
        urlActive === "http://localhost:3000/edition_hebergement" ||
        modifyMode === true
    ) {
        return (
            <div className="containerCard">
                <div className="cards">
                    <div className="cards__links">
                        <div className="cards__linearOppacity"></div>
                        {!cover.startsWith("http://") &&
                        !cover.startsWith("https://") ? (
                            <div className="cards__img alternative__text">
                                Photo de couverture de la carte hébérgement
                            </div>
                        ) : (
                            <img
                                className="cards__img"
                                src={cover}
                                alt={`Photographie : ${title}`}
                            />
                        )}

                        <h2 className="cards__titleCard">{title}</h2>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="cards">
                <Link className="cards__links" to={`/hebergement/${id}`}>
                    <div className="cards__linearOppacity"></div>
                    <img
                        className="cards__img"
                        src={cover}
                        alt={`Photographie : ${title}`}
                    />
                    <h2 className="cards__titleCard">{title}</h2>
                </Link>
            </div>
        )
    }
}
export default Card
