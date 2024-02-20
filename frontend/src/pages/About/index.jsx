import axios from "axios"
import Collapse from "../../components/Collapse"
import { useEffect, useState } from "react"
import { Audio } from "react-loader-spinner"
import "../../styles/loader.scss"

function About() {
    const [dataAbout, setDataAbout] = useState()
    const [loading, setLoading] = useState(true)
    window.localStorage.removeItem("toModify") // Suppression du token toModify du localStorage

    useEffect(() => {
        document.title = "À propos"
        if (!dataAbout) {
            axios
                .get("http://localhost:3001/api/about")
                .then((res) => {
                    setDataAbout(res.data.abouts)
                    setLoading(false)
                })
                .catch((error) => {
                    setLoading(false)
                    console.error(error)
                })
        }
    }, [dataAbout])
    if (loading || !dataAbout) {
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
    } else {
        return (
            <main>
                <div className="collapses">
                    {dataAbout.map((about, index) => (
                        <Collapse
                            key={`${about.name}-${index}`}
                            name={about.name}
                            description={about.description}
                        />
                    ))}
                </div>
            </main>
        )
    }
}

export default About
