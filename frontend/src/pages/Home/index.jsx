import Card from "../../components/Card"
import "./Home.scss"
import { NavLink } from "react-router-dom"
import { useEffect, useContext } from "react"
import { SharedDataContext } from "../../utils/Context/HousingsDatas/"
import { SharedDataLoginContext } from "../../utils/Context/UserLogin/"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

function Home() {
    //récupération des données depuis le context
    const [dataHousings] = useContext(SharedDataContext)
    const { isLogin } = useContext(SharedDataLoginContext)

    useEffect(() => {
        document.title = "Home"
    }, [])

    return (
        <main>
            {isLogin ? (
                <div className="createNewHousing">
                    <NavLink
                        to="/edition_hebergement"
                        className="createNewHousing__button"
                    >
                        {" "}
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="createNewHousing__icon"
                        />
                        Ajouter
                    </NavLink>
                </div>
            ) : null}
            <div className="wrapperGallery" aria-label="galerie d'hébergement">
                {dataHousings &&
                    dataHousings.map((housing) => (
                        <Card
                            key={housing._id}
                            id={housing._id}
                            cover={housing.cover}
                            title={housing.title}
                        />
                    ))}
            </div>
        </main>
    )
}

export default Home
