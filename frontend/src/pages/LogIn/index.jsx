import axios from "axios" // Gestion des fetches
import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { SharedDataLoginContext } from "../../utils/Context/UserLogin"
import { SharedDataLogoutContext } from "../../utils/Context/UserLogout"
import { useForm } from "react-hook-form"
import { Bounce, ToastContainer, toast } from "react-toastify"
import "../../pages/LogIn/LogIn.scss"
import "../../styles/customToast.scss"

function LogIn() {
    const navigate = useNavigate()
    const { setIsLogin, setDataLogin } = useContext(SharedDataLoginContext)
    const { isLogout, setIsLogout } = useContext(SharedDataLogoutContext)
    const [errorMessage, setErrorMessage] = useState("")
    const { register, handleSubmit, formState } = useForm()
    const { errors } = formState //Récupération de l'objet errors
    
    useEffect(() => {
        if (isLogout) {
            const notify = () => toast("Vous n'êtes plus connecté")
            notify() // Active la toastBar
            setTimeout(() => {
                setIsLogout(false)
            }, 4000)
        }
    })
    const onSubmit = (data) => {
        const credentials = {
            email: data.email,
            password: data.password,
        }
        axios
            .post("http://localhost:3001/api/auth/login", credentials)
            .then((res) => {
                sessionStorage.setItem("userData", JSON.stringify(res.data)) // On enregistre les informations utilisateurs dans le sessionStorage
                setDataLogin(res.data) // Met à jour les informations utilisateur dans le state
                setIsLogin(true) // Met à jour avec true le state isLogin
                navigate("/") // On redirige vers la page d'accueil
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setErrorMessage(
                        "L'identifiant paire : email / mot de passe est invalide"
                    )
                    console.log(errorMessage)
                } else if (error.response.status === 500) {
                    setErrorMessage(
                        "Le serveur a rencontré un problème, veuillez réessayer"
                    )
                }
            })
    }

    return (
        <main>
            <div>
                <ToastContainer
                    toastClassName="custom-toast"
                    bodyClassName="custom-toast-body"
                    progressClassName="custom-progress"
                    position="top-center"
                    autoClose={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    theme="light"
                    transition={Bounce}
                />
            </div>
            <form className="formContainer" onSubmit={handleSubmit(onSubmit)}>
                <div className="formContainer__champs">
                    <label className="formContainer__labels" htmlFor="email">
                        Adresse mail :
                    </label>
                    <input
                        className="formContainer__inputs"
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        {...register("email", {
                            required: "Vous devez rentrez une adresse email",
                            pattern: {
                                // eslint-disable-next-line no-useless-escape
                                value: /^([A-Za-z0-9_\-\.])+@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                                message: "Format d'adresse mail invalide",
                            },
                        })}
                    />
                    {errors.email && (
                        <span className="invalid-feedback">
                            {errors.email.message}
                        </span>
                    )}
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
                        {...register("password", {
                            required: "Vous devez rentrer un mot de passe",
                            minLength: {
                                value: 8,
                                message:
                                    "Le mot de passe doit contenir au moins 8 caractères",
                            },
                            maxLength: {
                                value: 20,
                                message:
                                    "Le mot de passe ne peut pas dépasser 20 caractères",
                            },
                        })}
                    />
                    {errors.password && (
                        <span className="invalid-feedback">
                            {errors.password.message}
                        </span>
                    )}
                    {errorMessage && (
                        <span className="invalid-feedback">{errorMessage}</span>
                    )}
                </div>
                <div className="formContainer__champs">
                    <button className="submitButton">Connexion</button>
                </div>
            </form>
        </main>
    )
}

export default LogIn
