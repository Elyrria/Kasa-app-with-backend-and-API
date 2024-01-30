import logo from "../assets/logo-red-kasa.svg"
import { NavLink } from "react-router-dom"
import "../styles/Header.scss"
import Banner from "./Banner"
import { useEffect, useState } from "react"
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
                        to="/A-Propos"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        A propos
                    </NavLink>
                </div>
            </nav>
            {urlActive === "http://localhost:3000/" ? (
                <Banner activeBanner={"bannerHome"} />
            ) : (
                urlActive === "http://localhost:3000/A-Propos" && (
                    <Banner activeBanner={"bannerAbout"} />
                )
            )}
        </header>
    )
}

export default Header
