import bannerHome1240 from "../../assets/banner-home-1240.webp"
import bannerHome375 from "../../assets/banner-home-375.webp"
import bannerAbout1240 from "../../assets/banner-about-1240.webp"
import bannerAbout375 from "../../assets/banner-about-375.webp"
import "./Banner.scss"

const sizeBanner = [1240, 375]

function Banner({ activeBanner }) {
    return (
        <div className="bannerWrapper">
            <div className="bannerWrapper--opacity"></div>
            {/*//! Condition qui permet de vérifier si le texte doit être affiché  */}
            {activeBanner === "bannerHome" && (
                <p className="bannerWrapper__para">
                    Chez vous, partout et ailleurs
                </p>
            )}
           {/*//! Condition qui permet de vérifier quelle image afficher dans la banière */}
            {activeBanner === "bannerHome" ? (
                <img
                    className="scaleHome"
                    src={bannerHome1240}
                    srcSet={` ${bannerHome375} ${sizeBanner[1]}w, ${bannerHome1240} ${sizeBanner[0]}w  `}
                    sizes={`(max-width: ${sizeBanner[1]}px) ${sizeBanner[1]}px, ${sizeBanner[0]}px`}
                    alt="Photographie de falaises en bord de mer"
                />
            ) : (
                activeBanner === "bannerAbout" && (
                    <img
                        className="scaleAbout"
                        src={bannerAbout1240}
                        srcSet={`${bannerAbout1240} ${sizeBanner[0]}w, ${bannerAbout375} ${sizeBanner[1]}w `}
                        sizes={`(max-width: ${sizeBanner[1]}px) ${sizeBanner[1]}px, ${sizeBanner[0]}px`}
                        alt="Photographie d'un fleuve avec des montagnes'"
                    />
                )
            )}
        </div>
    )
}

export default Banner
