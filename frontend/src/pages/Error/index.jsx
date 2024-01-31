import "./Error.scss"
import error from "../../assets/404.svg"
import { Link } from "react-router-dom"
import { useEffect } from "react"

function Error() {
    useEffect(() => {
        document.title = `404 🙈 Not found`
    }, [])

    return (
        <main className="errorPage">
            <img
                className="errorPage__image"
                src={error}
                alt="Logo erreur 404"
            />
            <p className="errorPage__para">
                Oups! La page que vous demandez n'existe pas.
            </p>
            <Link className="errorPage__link" to="/">
                Retourner sur la page d'accueil
            </Link>
        </main>
    )
}

export default Error
