import axios from "axios" // Gestion des fetches
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SharedDataLoginContext } from "../../utils/Context/UserLogin"
import "../../pages/LogIn/LogIn.scss"

function LogIn() {
    const navigate = useNavigate()
    const { setIsLogin, setDataLogin } = useContext(SharedDataLoginContext)
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    })

    const onSubmit = (e) => {
        e.preventDefault()
        console.log("formulaire : " + credentials.password, credentials.email)
        console.log(credentials)
        axios
            .post("http://localhost:3001/api/auth/login", credentials)
            .then((res) => {
                sessionStorage.setItem("userData", JSON.stringify(res.data)) // On enregistre les informations utilisateurs dans le sessionStorage
                setDataLogin(res.data) // Met à jour les informations utilisateur dans le state
                setIsLogin(true) // Met à jour avec true le state isLogin
                navigate("/") // On redirige vers la page d'accueil
            })
            .catch((error) => {
                console.log(error) //! Gestion des erreurs de connexion utilisateur à gérer plus tard
            })
    }

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <main>
            <form className="formContainer" onSubmit={onSubmit}>
                <div className="formContainer__champs">
                    <label className="formContainer__labels" htmlFor="email">
                        Adresse mail :
                    </label>
                    <input
                        className="formContainer__inputs"
                        type="email"
                        name="email"
                        id="email"
                        value={credentials.email}
                        autoComplete="email"
                        onChange={onChange}
                    />
                </div>
                <div className="formContainer__champs">
                    <label className="formContainer__labels" htmlFor="password">
                        Mot de passe :
                    </label>
                    <input
                        className="formContainer__inputs"
                        type="password"
                        name="password"
                        id="password"
                        value={credentials.password}
                        onChange={onChange}
                    />
                </div>
                <div className="formContainer__champs">
                    <button className="submitButton">Connexion</button>
                </div>
            </form>
        </main>
    )
}

export default LogIn
