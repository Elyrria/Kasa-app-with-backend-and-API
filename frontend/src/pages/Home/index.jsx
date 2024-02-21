import Card from "../../components/Card"
import axios from "axios"
import { NavLink } from "react-router-dom"
import { useEffect, useContext, useState } from "react"
import { SharedDataLoginContext } from "../../utils/Context/UserLogin/"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { SharedDataModifyHousingContext } from "../../utils/Context/ModifyHousing"
import { SharedActiveToastBar } from "../../utils/Context/ActiveToastBar"
import { Bounce, ToastContainer, toast } from "react-toastify"
import { Audio } from "react-loader-spinner"
import "../../styles/loader.scss"
import "react-toastify/dist/ReactToastify.css"
import "./Home.scss"
import "../../styles/customToast.scss"

function Home() {
    window.localStorage.removeItem("toModify") // Suppression du token toModify du localStorage
    const { isLogin } = useContext(SharedDataLoginContext)
    const { setModifyMode } = useContext(SharedDataModifyHousingContext)
    const {
        isActiveToastBar,
        setIsActiveToastBar,
        messageToastBar,
        setMessageToastBar,
    } = useContext(SharedActiveToastBar)
    const [loading, setLoading] = useState(true) // État pour le chargement
    const [housings, setHousings] = useState([])
    useEffect(() => {
        document.title = "Home"
        setModifyMode(false)

        axios
            .get("http://localhost:3001/api/housing")
            .then((res) => {
                setHousings(res.data.housings) // Met
                setLoading(false)
            })
            .catch((error) => {
                console.error(error)
                setLoading(false)
            })
    }, [isActiveToastBar, messageToastBar, setIsActiveToastBar, setModifyMode])
    useEffect(() => {
        if (isActiveToastBar) {
            const notify = () => toast(messageToastBar)
            notify() // Active la toastBar
            setTimeout(() => {
                setIsActiveToastBar(false)
                setMessageToastBar("")
            }, 3500)
        }
    })

    if (loading) {
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
                {isLogin ? (
                    <div className="createNewHousing">
                        <NavLink
                            to="/edition_hebergement"
                            className="createNewHousing__button"
                        >
                            <FontAwesomeIcon
                                icon={faPlus}
                                className="createNewHousing__icon"
                            />
                            Ajouter
                        </NavLink>
                    </div>
                ) : null}
                <div
                    className="wrapperGallery"
                    aria-label="galerie d'hébergement"
                >
                    {housings &&
                        housings.map((housing) => (
                            <Card
                                key={housing._id}
                                id={housing._id}
                                cover={housing.cover}
                                title={housing.title}
                            />
                        ))}
                </div>
                <div>
                    <ToastContainer
                        toastClassName="custom-toast"
                        bodyClassName="custom-toast-body"
                        progressClassName="custom-progress"
                        position="bottom-center"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        transition={Bounce}
                    />
                </div>
            </main>
        )
    }
}

export default Home
