import { useState } from "react"
import "../../pages/LogIn/LogIn.scss"

function LogIn() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    })

    const onSubmit = (e) => {
        e.preventDefault()
        console.log("formulaire : " + credentials.password, credentials.email)
        console.log(credentials)
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
                        value={credentials.email}
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
                        value={credentials.password}
                        onChange={onChange}
                    />
                </div>
                <div className="formContainer__champs">
                    <button className="formContainer__button">Connexion</button>
                </div>
            </form>
        </main>
    )
}

export default LogIn
