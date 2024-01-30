import "../../styles/Home.scss"
import dataHousings from "../../datas/housings.json"
import Card from "../../components/Card"
import { useEffect } from "react"

function Home() {
    useEffect(() => {
        document.title = "Home"
    }, [])

    return (
        <main>
            <div className="wrapperGallery" aria-label="galerie d'hébergement">
                {dataHousings.map((housing) => (
                    <Card
                        key={housing.id}
                        id={housing.id}
                        cover={housing.cover}
                        title={housing.title}
                    />
                ))}
            </div>
        </main>
    )
}

export default Home
