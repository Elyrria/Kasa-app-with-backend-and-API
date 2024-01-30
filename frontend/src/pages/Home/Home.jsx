import "../../styles/Home.scss"
// import dataHousings from "../../datas/housings.json"
import Card from "../../components/Card"
import { useEffect } from "react"
import { useFetch } from "../../utils/hooks/Hooks"

function Home() {
    const { data } = useFetch("http://localhost:3001/api/housing")
    const { housings } = data

    useEffect(() => {
        document.title = "Home"
    }, [])

    console.log("Data from useFetch:", data)
    console.log("DataHousings:", housings)

    return (
        <main>
            <div className="wrapperGallery" aria-label="galerie d'hébergement">
                {housings &&
                    housings.map((housing) => (
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
