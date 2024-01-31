import "./Card.scss"
import { Link } from "react-router-dom"

function Card({ cover, title, id }) {
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
export default Card
