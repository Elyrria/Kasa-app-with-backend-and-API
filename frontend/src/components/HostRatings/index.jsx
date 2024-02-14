import "./HostRatings.scss"
import ratingStarRed from "../../assets/rating-star-red.svg"
import ratingStarGrey from "../../assets/rating-star-grey.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
function HostRatings({ hostRating, hostName, hostPicture }) {
    const range = [1, 2, 3, 4, 5]
    return (
        <div className="ratingContainer">
            <div
                className="ratingContainer__ratings"
                aria-label={`note de ${hostRating} sur ${range.length}`}
            >
                {range.map((rangeElem, index) =>
                    hostRating >= rangeElem ? (
                        <img
                            className="star"
                            key={`${hostRating}-${index}`}
                            src={ratingStarRed}
                            alt=""
                            aria-hidden="true"
                        />
                    ) : (
                        <img
                            className="star"
                            key={`${hostRating}-${index}`}
                            src={ratingStarGrey}
                            alt=""
                            aria-hidden="true"
                        />
                    )
                )}
            </div>
            <div className="ratingContainer__host">
                <h4 className="ratingContainer__hostName">{hostName}</h4>
                {!hostPicture.startsWith("http://") &&
                !hostPicture.startsWith("https://") ? (
                    <div className="container__userIcon ratingContainer__hostPicture">
                        <FontAwesomeIcon
                            icon={faUser}
                            className="container__userIcon-icon "
                        />
                    </div>
                ) : (
                    <img
                        className="ratingContainer__hostPicture"
                        src={hostPicture}
                        alt={`Portrait ${hostName}, hôte du logement`}
                    />
                )}
            </div>
        </div>
    )
}

export default HostRatings
