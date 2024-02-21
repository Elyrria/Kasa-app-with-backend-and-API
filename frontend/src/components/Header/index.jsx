import logo from "../../assets/logo-red-kasa.svg"
import Banner from "../Banner"
import "./Header.scss"
import { useContext, useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { SharedDataLoginContext } from "../../utils/Context/UserLogin"
import { SharedActiveToastBar } from "../../utils/Context/ActiveToastBar"

function Header() {
    const [urlActive, setUrlActive] = useState("")
    const { isLogin, dataLogin, setIsLogin, setDataLogin } = useContext(
        SharedDataLoginContext
    )
    const { setIsActiveToastBar, setMessageToastBar } =
        useContext(SharedActiveToastBar)
    const location = useLocation()
    const navigate = useNavigate() // Utilisaton du hook navigate pour la rédirection

    const onClick = () => {
        const updateDataLogin = { ...dataLogin }
        updateDataLogin.userId = null
        updateDataLogin.token = null
        sessionStorage.removeItem("userData")
        setIsLogin(false) // L'utilisateur n'est plus connecté on passe donc la valeur à false
        setDataLogin(updateDataLogin) // On vide les données de l'utilisateur connecté
        navigate("/") // Redirection vers la page d'accueil
    }

    useEffect(() => {
        setUrlActive(window.location.href)
        const userData = JSON.parse(sessionStorage.getItem("userData"))
        if (userData && typeof userData === "object") {
            setDataLogin(userData)
            setIsLogin(true)
            return
        }
    }, [location, setDataLogin, setIsLogin]) // Effectue l'effet des que l'url change change

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
                        //Permet d'éviter de relancer des toastbar lors du clique sur acceuil
                        onClick={() => {
                            setIsActiveToastBar(false)
                            setMessageToastBar("")
                        }}
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
                    {!isLogin ? (
                        <NavLink
                            to="/login"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            Connexion
                        </NavLink>
                    ) : (
                        <button className="logOut" onClick={onClick}>
                            Déconnexion
                        </button>
                    )}
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
