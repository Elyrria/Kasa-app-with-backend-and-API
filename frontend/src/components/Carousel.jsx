import "../styles/Carousel.scss"
import chevronLeft from "../assets/chevron-left.svg"
import chevronRight from "../assets/chevron-right.svg"
import { useState } from "react"

function Carousel({ pictures, title, id }) {
    const [slide, setSlide] = useState(0)

    const nextSlide = () => {
        setSlide(slide === pictures.length - 1 ? 0 : slide + 1)
    }
    const prevSlide = () => {
        setSlide(slide === 0 ? pictures.length - 1 : slide - 1)
    }

    return (
        <div className="carouselContainer" aria-label="carousel d'images">
            <div className="carouselContainer__carousel">
                <button
                    aria-label="image suivante"
                    onClick={nextSlide}
                    className={
                        pictures.length <= 1
                            ? "hidden"
                            : "carousel__btn carousel__btnRight"
                    }
                >
                    <img src={chevronLeft} alt="" className="chevronRight" />
                </button>
                {pictures.map((picture, index) => (
                    <img
                        key={`${id}-${index}`}
                        className={
                            slide === index ? "carousel__slide" : "hidden"
                        }
                        src={picture}
                        alt={title}
                    />
                ))}
                <button
                    aria-label="image précédente"
                    onClick={prevSlide}
                    className={
                        pictures.length <= 1
                            ? "hidden"
                            : "carousel__btn carousel__btnLeft"
                    }
                >
                    <img src={chevronRight} alt="" className="chevronLeft" />
                </button>
                <span
                    aria-label={`image ${slide + 1} sur ${pictures.length}`}
                    className={
                        pictures.length <= 1 ? "hidden" : "carousel__indicator"
                    }
                >
                    <span aria-hidden="true">{`${slide + 1}/${
                        pictures.length
                    }`}</span>
                </span>
            </div>
        </div>
    )
}

export default Carousel
