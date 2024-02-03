import Collapse from "../../components/Collapse"
import { useEffect } from "react"
import { useFetch } from "../../utils/Hooks/"

function About() {
    const { data, loading } = useFetch("http://localhost:3001/api/about")
    const abouts = data.abouts

    useEffect(() => {
        document.title = "À propos"
    }, [])

    if (loading || !abouts) {
        return <div>Loading ...</div>
    } else {
        return (
            <main>
                <div className="collapses">
                    {abouts.map((about, index) => (
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
