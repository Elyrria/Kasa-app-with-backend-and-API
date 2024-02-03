import logo from "../../assets/logo-red-kasa.svg"
import Banner from "../Banner"
import "./Header.scss"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useLocation } from "react-router-dom"

function Header() {
    const [urlActive, setUrlActive] = useState("")
    const location = useLocation()

    useEffect(() => {
        setUrlActive(window.location.href)
    }, [location]) // Effectue l'effet des que l'url change change

    return (
        <header className="header">
            <nav className="header__nav">
                <h1 aria-label="Kasa">
                    <img src={logo} alt="Kasa" />
                </h1>
                <div className="nav__links">
                    <NavLink
                        to="/"
                        //? Permet gràce au composant NavLink de pouvoir ajouter une classe active au link séléctionné
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        Accueil
                    </NavLink>
                    <NavLink
                        to="/a_propos"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        A propos
                    </NavLink>
                    <NavLink
                        to="/login"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        Connexion
                    </NavLink>
                </div>
            </nav>
            {urlActive === "http://localhost:3000/" ? (
                <Banner activeBanner={"bannerHome"} />
            ) : (
                urlActive === "http://localhost:3000/a_propos" && (
                    <Banner activeBanner={"bannerAbout"} />
                )
            )}
        </header>
    )
}

export default Header
