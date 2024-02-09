import Card from "../../components/Card"
import "./Home.scss"
import { useEffect, useContext } from "react"
import { SharedDataContext } from "../../utils/Context/HousingsDatas/"

function Home() {
    //récupération des données depuis le context
    const [dataHousings] = useContext(SharedDataContext)

    useEffect(() => {
        document.title = "Home"
    }, [])

    return (
        <main>
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
