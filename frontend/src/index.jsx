import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./styles/index.scss"
import Home from "./pages/Home"
import About from "./pages/About"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Error from "./pages/Error"
import Housings from "./pages/Housings"
import LogIn from "./pages/LogIn"
import HousingEditor from "./pages/HousingEditor"
import { DataProvider } from "./utils//Context/HousingsDatas"
import { DataLoginProvider } from "./utils/Context/UserLogin"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <Router>
            <DataLoginProvider>
                <Header />
                <DataProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/a_propos" element={<About />} />
                        <Route path="/login" element={<LogIn />}></Route>
                        <Route
                            path={"/hebergement/:id"}
                            element={<Housings />}
                        />
                        <Route
                            path="/edition_hebergement"
                            element={<HousingEditor />}
                        ></Route>
                        <Route path="*" element={<Error />} />
                    </Routes>
                </DataProvider>
            </DataLoginProvider>
            <Footer />
        </Router>
    </React.StrictMode>
)
