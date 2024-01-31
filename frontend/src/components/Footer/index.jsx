import logo from "../../assets/logo-white.svg"
import "./Footer.scss"

function Footer() {
    return (
        <footer className="footer">
            <img className="footer__logo" src={logo} alt="Kasa" />
            <p className="footer__para">© 2020 Kasa. All rights reserved</p>
        </footer>
    )
}
export default Footer
