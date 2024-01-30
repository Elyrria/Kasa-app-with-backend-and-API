import "../styles/Collapse.scss"
import { useState } from "react"
import ButtonCollapse from "./ButtonCollapse"

function Collapse({ name, description, equipments }) {
    const [isActivate, setIsActivate] = useState(false)

    return (
        <div className="collapseContainer">
            {Array.isArray(equipments) && equipments.length > 0 ? (
                <div className="collapseContainer__collapse">
                    <ButtonCollapse
                        name={name}
                        isActivate={isActivate}
                        setIsActivate={setIsActivate}
                    />
                    <div
                        className={`${
                            isActivate ? "open" : ""
                        } collapseContent`}
                    >
                        <ul className="collapseContent__list">
                            {equipments.map((equipement, index) => (
                                <li key={`${equipement}-${index}`}>
                                    {equipement}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="collapseContainer__collapse">
                    <ButtonCollapse
                        name={name}
                        isActivate={isActivate}
                        setIsActivate={setIsActivate}
                    />
                    <div
                        className={`${
                            isActivate ? "open" : ""
                        } collapseContent`}
                    >
                        <p className="collapseContent__para">{description}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Collapse
