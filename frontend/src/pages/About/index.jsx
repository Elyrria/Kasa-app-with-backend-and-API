import Collapse from "../../components/Collapse"
import { useEffect } from "react"

const dataAbout = {
    names: ["Fiabilité", "Respect", "Service", "Sécurité"],
    descriptions: [
        "Les annonces postées sur Kasa garantissent une fiabilité totale. Les photos sont conformes aux logements et toutes les inofrmations sont régulièrement vérifiées par nos équipes.",
        "La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entrainera une expulsion de la plateforme.",
        "La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entrainera une expulsion de la plateforme.",
        "La sécurité est la priorité de Kasa. Aussi bien pour nos hôtes que pour les voyageurs. Chaque logement correspond aux critères de sécurité établis par nos services. En laissant une note aussi bien à l'hôte qu'au locataire, cela permet à nos équipes de vérifier que les standards sont bien respectés. Nous organisons également des ateliers sur la sécurité domestique pour nos hôtes.",
    ],
}

function About() {
    useEffect(() => {
        document.title = "À propos"
    }, [])

    return (
        <main>
            <div className="collapses">
                {dataAbout.names.map((name, index) => (
                    <Collapse
                        key={`${name}-${index}`}
                        name={name}
                        description={dataAbout.descriptions[index]}
                    />
                ))}
            </div>
        </main>
    )
}

export default About
